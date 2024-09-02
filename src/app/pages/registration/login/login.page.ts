import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  emailValue?: string;
  passValue?: string;

  usuarios = [
    {'email':'admin@admin.cl','pass':'admin123','tipo':'admin',},
    {'email':'pasajero@user.cl','pass':'user123','tipo':'pasajero',},
    {'email':'conductor@user.cl','pass':'user123','tipo':'conductor',}
    ]

  constructor(private router: Router, 
              private loadingController: LoadingController, 
              private alertController: AlertController,
              private formBuilder: FormBuilder) 
              { 
                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  pass: ['', [Validators.required, Validators.minLength(6)]],
                });
              }

  ngOnInit() {
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

    const usuario = this.usuarios.find(aux => aux.email === email && aux.pass === pass);

    if (usuario ){
      localStorage.setItem('usuarioLogin', JSON.stringify(usuario));
      (await loading).present();
      setTimeout(async() => {
        (await loading).dismiss();
        if (usuario.tipo === 'admin') {
          this.router.navigate(['']);
        } else if (usuario.tipo === 'pasajero') {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['']);
        }
        
      },2000);
    } else {
      (await alert).present();
      this.emailValue = '';
      this.passValue = '';
    }

    
  }

}
