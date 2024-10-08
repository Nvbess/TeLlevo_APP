import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  esConductor?: boolean;
  deseaConductor?: boolean;

  constructor(
    private router: Router, 
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private fireStore: AngularFirestore,) 
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
      try {
        const loading = await this.loadingController.create({
          message: 'Registrando...',
          duration: 2000,
        });
        await loading.present();

        const aux = await this.authService.register(this.registerForm.value.email, this.registerForm.value.pass);
        const user = aux.user;

        if (user) {
          await this.fireStore.collection('usuarios').doc(user.uid).set({
          uid: user.uid,
          nombre: this.registerForm.value.nombre,
          apellido: this.registerForm.value.apellido,
          email: user.email,
          pass: this.registerForm.value.pass,
          tipo: this.esConductor ? 'conductor' : 'pasajero', 
          celular: this.registerForm.value.celular,
          modeloAuto: this.registerForm.value.modeloAuto || '',
          patenteAuto: this.registerForm.value.patenteAuto || '',
          });
          await loading.dismiss();
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Usuario Registrado Correctamente',
            confirmButtonText: 'OK',
            heightAuto: false,
          }).then(() => {
            this.router.navigate(['/login']);
          })
        }
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registro Fallido!',
            text: 'Error al registrar',
            confirmButtonText: 'OK',
            heightAuto: false,
          })
      }
    }
}
