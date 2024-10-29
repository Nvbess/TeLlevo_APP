import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  apiKey = environment.googleApiKey;
  origenLat = -33.598449986499055;  // Coordenadas de ejemplo (cambia según tu aplicación)
  origenLng = -70.57880611157175;
  destinoLat!: number;  // Define el destino según el viaje que esté creando el conductor
  destinoLng!: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private viajeService: ViajesService,
    private mensajeService: MensajesService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private http: HttpClient
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

      const destino = this.viajeForm.value.destino;

      // Primero, convierte la dirección de destino en coordenadas
      await this.geocodeDestino(destino);

      const viajeData: Viaje = {
        origen: 'Duoc UC Sede Puente Alto',
        destino,
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

        // Llama al método para guardar el mapa estático
        await this.capturarMapaEstaticoYGuardar(viajeId);

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

  async geocodeDestino(direccion: string) {
    const geocoder = new google.maps.Geocoder();
    return new Promise<void>((resolve, reject) => {
      geocoder.geocode({ address: direccion }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          this.destinoLat = location.lat();
          this.destinoLng = location.lng();
          resolve();
        } else {
          console.error('Error al obtener coordenadas:', status);
          reject(new Error('No se pudieron obtener las coordenadas del destino.'));
        }
      });
    });
  }
  

  async obtenerMapaEstaticoConRuta(origenLat: number, origenLng: number, destinoLat: number, destinoLng: number): Promise<string> {
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x800&maptype=roadmap&markers=color:blue|label:O|${origenLat},${origenLng}&markers=color:red|label:D|${destinoLat},${destinoLng}&path=color:0x0000ff|weight:5|${origenLat},${origenLng}|${destinoLat},${destinoLng}&key=${this.apiKey}`;
    return mapUrl;
  }

  async capturarMapaEstaticoYGuardar(viajeId: string): Promise<void> {
    const urlImagen = await this.obtenerMapaEstaticoConRuta(this.origenLat, this.origenLng, this.destinoLat, this.destinoLng);

    return new Promise((resolve, reject) => {
      this.http.get(urlImagen, { responseType: 'blob' }).subscribe(async (blob) => {
        try {
          const filePath = `viajes/${viajeId}/imagenmapa.png`;
          const ref = this.storage.ref(filePath);
          await ref.put(blob);
          
          // Obtener la URL de descarga de la imagen y guardarla en Firestore
          const downloadURL = await ref.getDownloadURL().toPromise();
          await this.firestore.collection('viajes').doc(viajeId).update({
            imagenMapa: downloadURL
          });
          
          resolve();
        } catch (error) {
          reject(error);
          console.error("Error al guardar la imagen en Firebase Storage:", error);
        }
      }, (error) => {
        reject(error);
        console.error("Error al descargar la imagen del mapa estático:", error);
      });
    });
  }
}