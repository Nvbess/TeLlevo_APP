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
import { MensajesService } from 'src/app/services/mensajes.service';

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
    private mensajeService: MensajesService,
  ) {
    this.viajeForm = this.formBuilder.group({
      origen: [{ value: 'Duoc UC Sede Puente Alto', disabled: true }, [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
  
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.conductorUid = user.uid;
      }
    });
  }

  ngOnInit(){
  }

  async registerViaje() {
  if (this.viajeForm.valid) {
    if (!this.conductorUid) {
      this.mensajeService.mensaje('Error','Error al obtener UID', 'No se pudo obtener el UID del conductor. Inicia sesión nuevamente.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando viaje...',
    });
    await loading.present();

    const viajeData: Viaje = {
      origen: 'Duoc UC Sede Puente Alto',
      destino: this.viajeForm.value.destino,
      fecha: this.viajeForm.value.fecha,
      hora: this.viajeForm.value.hora,
      costo: this.viajeForm.value.valor,
      capacidad: this.viajeForm.value.capacidad,
      asientos_disponibles: this.viajeForm.value.capacidad,
      conductorUid: this.conductorUid,
      pasajerosUids: [],
      estado: 'en espera',
      imagenMapa: ''
    };

    try {
      const viajeRef = await this.viajeService.addViaje(viajeData);
      const viajeId = viajeRef.id;

      await loading.dismiss();

      this.router.navigate([`/cond-viajeinit/${viajeId}`]);

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
