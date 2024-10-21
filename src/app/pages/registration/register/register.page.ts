import { RandomuserService } from './../../../services/api/randomuser.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
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
    private mensajes: MensajesService,
    private router: Router, 
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private randomUser: RandomuserService,
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
          this.mensajes.mensaje('success','Registro Exitoso','Usuario Registrado Correctamente').then(() => {
            this.router.navigate(['/login']);
          })
        }
      } catch (error) {
        this.mensajes.mensaje('error','Registro Fallido!','Error al registrar')
      }
    }

    async registerUsersFromAPI() {
      let loading: any;
      try {
        const loading = await this.loadingController.create({
          message: 'Registrando usuarios aleatorios...',
          duration: 2000,
        });
        await loading.present();
    
        const randomUsers = await this.randomUser.getRandomUsers(10);
    
        if (randomUsers && randomUsers.length === 10) {
          const conductor = randomUsers.slice(0, 5);
          const pasajero = randomUsers.slice(5);
    
          await this.registerRandomUser(conductor, true); 
    
          await this.registerRandomUser(pasajero, false);
    
          await loading.dismiss();
          this.mensajes.mensaje('success', 'Registro Exitoso', 'Se han registrado los usuarios correctamente');
        }
      } catch (error) {
        await loading.dismiss();
        this.mensajes.mensaje('error', 'Registro Fallido!', 'Error al registrar');
      }
    }
    
    async registerRandomUser(randomUser: any, esConductor: boolean) {
      try {
        const firstName = randomUser.name.first.toLowerCase();
        const lastName = randomUser.name.last.toLowerCase();
        const emailDomain = esConductor ? 'conductor.cl' : 'pasajero.cl';
        const email = `${firstName}.${lastName}@${emailDomain}`;
    
        const aux = await this.authService.register(email, 'user123');
        const user = aux.user;
        
        if (user) {
    
          await this.fireStore.collection('usuarios').doc(user.uid).set({
            uid: user.uid,
            nombre: randomUser.name.first,
            apellido: randomUser.name.last,
            email: user.email,
            pass: 'user123',  
            tipo: esConductor ? 'conductor' : 'pasajero',
            celular: randomUser.cell || randomUser.phone, 
            modeloAuto: esConductor ? 'Toyota Corolla' : '', 
            patenteAuto: esConductor ? 'ABC123' : '', 
          });
        }
      } catch (error) {
        this.mensajes.mensaje('error', 'Registro Fallido!', 'Error al registrar');
      }
    }
    
}
