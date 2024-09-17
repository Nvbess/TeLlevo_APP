import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private menuController: MenuController) 
  { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  forgotpass() {
    this.router.navigate(['reset-pass']);
  }

  async login() {
    if (this.loginForm.invalid) {
      await this.presentAlert('Error', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    const { email, pass } = this.loginForm.value;

    const aux = this.usuarioService.getUsuarios();
    const usuario = aux.find(aux => aux.email === email && aux.pass === pass);

    if (usuario) {
      localStorage.setItem('usuarioLogin', JSON.stringify(usuario));
      setTimeout(async () => {
        await loading.dismiss();
        if (usuario.tipo === 'admin') {
          this.router.navigate(['admin-home']);
        } else if (usuario.tipo === 'pasajero') {
          this.router.navigate(['pasajero-home']);
        } else {
          this.router.navigate(['cond-home']);
        }
      }, 2000);
    } else {
      await loading.dismiss();
      await this.presentAlert('Acceso denegado', 'Usuario o Contraseña incorrectas!');
      this.loginForm.reset();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
