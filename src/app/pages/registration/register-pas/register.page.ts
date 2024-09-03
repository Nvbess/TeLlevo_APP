import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  emailValue?: string;
  passValue?: string;
  nameValue?: string;
  apellValue?: string;
  celValue?: string;


  constructor(private router: Router, 
              private loadingController: LoadingController, 
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private usuarioService: UsuariosService) 
              { 
                this.registerForm = this.formBuilder.group(
                  {
                  email: ['', [Validators.required, Validators.email]],
                  pass: ['', [Validators.required, Validators.minLength(6)]],
                  nombre: ['', Validators.required],
                  apellido: ['', Validators.required],
                  celular: ['', Validators.required],
                }
              );
              }

  ngOnInit() {
  }

  async register() {
    if (this.registerForm.valid) {
      const { email, pass, nombre, apellido, celular } = this.registerForm.value;
      
      const nuevoUsuario: Usuario = {
        email: this.emailValue || '',
        pass: this.passValue || '',
        tipo: 'pasajero',
        nombre: this.nameValue || '',
        apellido: this.apellValue || '',
        celular: this.celValue || '',
        id: 0,
      };
      this.router.navigate(['login']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
