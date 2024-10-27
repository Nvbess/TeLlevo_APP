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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore) 
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
  
        if (usuarioData.tipo === 'admin') {
          this.router.navigate(['/admin-home']);
        } else if (usuarioData.tipo === 'pasajero') {
          this.router.navigate(['/pasajero-home']);
        } else {
          this.router.navigate(['/conductor-home']);
        }
  
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      this.loginForm.reset();
    }
  }

}
