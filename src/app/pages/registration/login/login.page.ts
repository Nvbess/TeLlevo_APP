import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
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
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
    try {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();
  
      const { email, pass } = this.loginForm.value;
  
      const aux = await this.authService.login(email as string,pass as string);
      const usuario = aux.user;
  
      if (usuario) {
        localStorage.setItem('usuarioLogin', email as string);

        const tipo = 'admin';

        await loading.dismiss();

        if (tipo === 'admin') {
          this.router.navigate(['/admin-home']);
        } else if (tipo === 'pasajero') {
          this.router.navigate(['/pasajero-home']);
        } else {
          this.router.navigate(['/conductor-home']);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Inicio de Sesión Fallido',
        text: '',
        confirmButtonText: 'OK',
        heightAuto: false,
      })
    }
  }
}
