import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';

@Component({
  selector: 'app-cond-viaje',
  templateUrl: './cond-viaje.page.html',
  styleUrls: ['./cond-viaje.page.scss'],
})
export class CondViajePage implements OnInit {

  viajeForm: FormGroup;

  conductorUid: string | null = null;
  origenValue?: string;
  destinoValue?: string;
  fechaValue?: string;
  horaValue?: string;
  valorValue?: number;
  capacidadValue?: number;
  asientosValue?: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private viajeService: ViajesService,
    private menuController: MenuController
  ) {
    this.viajeForm = this.formBuilder.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
  
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.conductorUid = user.uid;  // Guardamos el UID del conductor
      }
    });
  }

  ngOnInit(){
  }

  async registerViaje() {
    if (this.viajeForm.valid) {
      if (!this.conductorUid) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo obtener el UID del conductor. Inicia sesión nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
  
      const loading = await this.loadingController.create({
        message: 'Creando viaje...',
      });
      await loading.present();
  
      const viajeData: Viaje = {
        origen: this.viajeForm.value.origen,
        destino: this.viajeForm.value.destino,
        fecha: this.viajeForm.value.fecha,
        hora: this.viajeForm.value.hora,
        costo: this.viajeForm.value.valor,
        capacidad: this.viajeForm.value.capacidad,
        asientos_disponibles: this.viajeForm.value.capacidad,
        conductorUid: this.conductorUid,  // Asegurarse que nunca sea null
        pasajerosUids: [],
        estado: 'en curso'
      };
  
      try {
        await this.viajeService.addViaje(viajeData);
        await loading.dismiss();
        this.router.navigate(['/cond-viajeinit']);  // Redirige a la página de inicio del viaje
      } catch (error) {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al crear el viaje. Inténtalo de nuevo.',
          buttons: ['OK'],
        });
        await alert.present();
      }
  
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
