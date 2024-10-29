import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cond-viaje',
  templateUrl: './cond-viaje.page.html',
  styleUrls: ['./cond-viaje.page.scss'],
})
export class CondViajePage implements OnInit {

  viajeForm: FormGroup;
  autocompleteService: any;
  autocompleteItems: any[] = [];
  conductorUid: string | null = null;

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

  ngOnInit() {
    this.loadGoogleMapsApi().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    });
  }

  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Google Maps API loaded');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Error loading Google Maps API:', error);
          reject(error);
        };
        document.head.appendChild(script);
      }
    });
  }

  buscarDirecciones(ev: any) {
    const val = ev.target.value;
    if (val && val.length > 0) {
      const request = {
        input: val,
        componentRestrictions: { country: 'CL' } 
      };
  
      this.autocompleteService.getPlacePredictions(request, (predictions: any[], status: string) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.autocompleteItems = predictions.slice(0, 2);
        } else {
          this.autocompleteItems = [];
        }
      });
    } else {
      this.autocompleteItems = [];
    }
  }

  seleccionarDireccion(item: any) {
    this.viajeForm.patchValue({ destino: item.description });
    this.autocompleteItems = [];
  }

  fechaToString(value: any) {
    const formattedValue = this.formatearFecha(String(value ?? ''));
    this.viajeForm.patchValue({ fecha: formattedValue });
  }

  formatearFecha(input: string): string {
    const cleaned = input.replace(/\D/g, '');
  
    if (cleaned.length === 8) {
      return `${cleaned.substring(0, 2)}-${cleaned.substring(2, 4)}-${cleaned.substring(4, 8)}`;
    }
  
    return cleaned;
  }

  async registerViaje() {
    if (this.viajeForm.valid) {
      if (!this.conductorUid) {
        this.mensajeService.mensaje('Error', 'Error al obtener UID', 'No se pudo obtener el UID del conductor. Inicia sesión nuevamente.');
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
        pasajerosEstados: {},
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
