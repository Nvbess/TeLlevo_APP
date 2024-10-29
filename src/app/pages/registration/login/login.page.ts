import { MensajesService } from './../../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private loadingController: LoadingController,
    private MensajesService: MensajesService, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,) 
  { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    
    await loading.present();
  
    try {
      const { email, pass } = this.loginForm.value;
  
      const aux = await this.authService.login(email as string, pass as string);
  
      if (aux.user) {
        const usuarioLogeado = await this.firestore.collection('usuarios').doc(aux.user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;
  
        if (usuarioData.estado === 'deshabilitado') {
          await this.authService.logout(); 
          loading.dismiss();
          this.MensajesService.mensaje('error','Cuenta deshabilitada','Tu cuenta ha sido deshabilitada. No puedes acceder a la aplicación.');
          return;
        }
  
        // Redireccionar según el tipo de usuario
        if (usuarioData.tipo === 'admin') {
          this.router.navigate(['/admin-home']);
        } else if (usuarioData.tipo === 'pasajero') {
          this.router.navigate(['/pasajero-home']);
        } else {
          this.router.navigate(['/conductor-home']);
        }
  
        // Esperar hasta que la navegación termine para cerrar el loading
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            loading.dismiss();
          }
        });
      } else {
        loading.dismiss();
      }
    } catch (error) {
      console.error('Error en el login:', error);
      loading.dismiss();
      this.MensajesService.mensaje('error','Error','Hubo un error al iniciar sesión.');
      this.loginForm.reset();
    }
  }

  async loginWithGoogle() {
    try {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión con Google...',
        duration: 2000,
      });
      await loading.present();

      const credential = await this.authService.loginWithGoogle();
      const user = credential.user;

      if (user) {
        await this.firestore.collection('usuarios').doc(user.uid).set({
          uid: user.uid,
          nombre: user.displayName?.split(' ')[0] || '',
          apellido: user.displayName?.split(' ')[1] || '',
          email: user.email,
          tipo: 'pasajero',
          celular: '',
          estado: 'habilitado'
        });
        await loading.dismiss();
        this.router.navigate(['/pasajero-home']);
      }
    } catch (error) {
      this.MensajesService.mensaje('error', 'Inicio de sesión fallido!', 'Error al iniciar sesión con Google');
    }
  }
  
  async loginWithGitHub() {
    try {
      const result = await this.authService.loginWithGitHub();
      this.router.navigate(['/pasajero-home']);
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error);
    }
  }

}
