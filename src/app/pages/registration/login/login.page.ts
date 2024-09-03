import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  emailValue?: string;
  passValue?: string;

  

  constructor(private router: Router, 
              private loadingController: LoadingController, 
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private usuarioService: UsuariosService) 
              { 
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  pass: ['', [Validators.required, Validators.minLength(6)]],
                });
              }

  ngOnInit() {
  }

  forgotpass() {
    this.router.navigate(['inicio']);
  }

  async login() {

    // Creamos loading
    const loading = this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });

    // Creamos alerta
    const alert = this.alertController.create({
      header: 'Acceso denegado',
      message: 'Usuario o Contraseña incorrectas!',
      buttons: ['OK']
    });

    const email = this.emailValue;
    const pass = this.passValue;

    // PREGUNTAR POR EL USUARIO

    const aux = this.usuarioService.getUsuarios();
    const usuario = aux.find(aux => aux.email === email && aux.pass === pass);

    if (usuario ){
      localStorage.setItem('usuarioLogin', JSON.stringify(usuario));
      (await loading).present();
      setTimeout(async() => {
        (await loading).dismiss();
        if (usuario.tipo === 'admin') {
          this.router.navigate(['admin-home']);
        } else if (usuario.tipo === 'pasajero') {
          this.router.navigate(['pasajero-home']);
        } else {
          this.router.navigate(['conductor-home']);
        }
        
      },2000);
    } else {
      (await alert).present();
      this.emailValue = '';
      this.passValue = '';
    }

    
  }

}
