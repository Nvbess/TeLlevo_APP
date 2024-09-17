import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  esConductor: boolean = false;
  deseaConductor: boolean = false;

  constructor(
    private router: Router, 
    private loadingController: LoadingController, 
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private menuController: MenuController) 
    { 
      this.registerForm = this.formBuilder.group
      ({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        celular: ['', [Validators.required]],
        tieneAuto: ['', Validators.required],
        crearConductor: [''], 
        modeloAuto: [''],
        patenteAuto: [''],
      });
    }

    ngOnInit() {
      this.menuController.enable(false);
    }
  
    TieneAuto(event: any) {
      this.esConductor = event.detail.value === 'si';
      this.registerForm.get('crearConductor')?.setValidators(this.esConductor ? [Validators.required] : []);
      this.registerForm.get('crearConductor')?.updateValueAndValidity();

      if (!this.esConductor) {
        this.registerForm.get('modeloAuto')?.clearValidators();
        this.registerForm.get('patenteAuto')?.clearValidators();
        this.deseaConductor = false;
      }
    }

    CrearConductor(event: any) {
      this.deseaConductor = event.detail.value === 'si';
      if (this.deseaConductor) {
        this.registerForm.get('modeloAuto')?.setValidators([Validators.required]);
        this.registerForm.get('patenteAuto')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('modeloAuto')?.clearValidators();
        this.registerForm.get('patenteAuto')?.clearValidators();
      }
      this.registerForm.get('modeloAuto')?.updateValueAndValidity();
      this.registerForm.get('patenteAuto')?.updateValueAndValidity();
    }
  
    async register() {
      if (this.registerForm.valid) {
        const loading = await this.loadingController.create({
          message: 'Registrando...',
        });
        await loading.present();
  
        const nuevoUsuario: Usuario = {
          nombre: this.registerForm.value.nombre,
          apellido: this.registerForm.value.apellido,
          email: this.registerForm.value.email,
          pass: this.registerForm.value.pass,
          tipo: this.esConductor ? 'conductor' : 'pasajero', 
          celular: this.registerForm.value.celular,
          id: 0,
          modeloAuto: this.registerForm.value.modeloAuto || '',
          patenteAuto: this.registerForm.value.patenteAuto || '',
        };
        try {
          this.usuarioService.addUsuario(nuevoUsuario);
          await this.router.navigate(['login']);
        } catch (error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al registrar el usuario. Inténtelo de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
        } finally {
          loading.dismiss();
        }
  
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
