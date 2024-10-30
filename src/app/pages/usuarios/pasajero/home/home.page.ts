import { MensajesService } from './../../../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import * as L from 'leaflet';
import { Loader } from '@googlemaps/js-api-loader';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import html2canvas from 'html2canvas';
import { BarcodeScanningModalComponent } from '../home/barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Viaje } from 'src/app/interfaces/viaje';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public idUsuario?: number;
  public estadoUsuario?: string;

  public viajes: any = [];

  map: any;
  origenLat = -33.598449986499055;  
  origenLng = -70.57880611157175;
  destinoLat!: number;
  destinoLng!: number;
  rutaCapa: any = null;
  apiKey = environment.googleApiKey;
  public estaEnViaje: boolean = false;
  public qrEscaneado: boolean = false;
  viajeActual: any;
  resultadoQR = '';

  constructor(
    private router: Router,
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private http: HttpClient,
    private MensajesService: MensajesService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ionViewDidEnter() {
    this.loadMap();
    this.cargarViajesEnEspera(); 
  }

  ngOnInit() {
    this.menuController.enable(true);
    this.checklogin();

    this.route.queryParams.subscribe(params => {
      if (params['destino']) {
        this.geocodeDestino(params['destino']);
      }
    });

    this.router.events.subscribe(() => {
      this.clearRoute();
    });
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.tipoUsuario = usuarioData.tipo;
          this.emailUsuario = usuarioData.email;
          this.nombreUsuario = usuarioData.nombre;
          this.apellUsuario = usuarioData.apellido;
          this.estadoUsuario = usuarioData.estado;
        }

        if (usuarioData.estado === 'deshabilitado') {
          await this.authService.logout();
          this.MensajesService.mensaje('error', 'Cuenta deshabilitada', 'Tu cuenta ha sido deshabilitada. No puedes acceder a la aplicación.');
          this.router.navigate(['/inicio']);
        }
        this.checkViajeActual(user.uid);
      }
    });
  }

  async checkViajeActual(userId: string) {
    this.authService.isUserInTrip(userId).subscribe(async (isInTrip) => {
      console.log('¿El usuario está en un viaje?', isInTrip); // Debug
  
      this.estaEnViaje = isInTrip;
  
      if (this.estaEnViaje) {
        // Obtener el viaje actual
        this.viajesService.getViajePorPasajero(userId).subscribe(viajes => {
          if (viajes.length > 0) {
            this.viajeActual = viajes[0]; // Obtener el primer viaje
            console.log('Viaje Actual:', this.viajeActual); // Para verificar la información
            
            // Acceder a los campos del viaje
            console.log('Destino del viaje:', this.viajeActual.destino);
            console.log('Fecha del viaje:', this.viajeActual.fecha);
            console.log('Hora del viaje:', this.viajeActual.hora);
          } else {
            console.log('No hay viaje activo para este usuario.'); // Debug
            this.viajeActual = null; // No hay viaje activo
          }
        });
      }
    });
  }

  async confirmarEstadoPasajero(viajeId: string, userId: string) {
    const viajeDoc = await this.fireStore.collection('viajes').doc(viajeId).get().toPromise();
    
    if (viajeDoc && viajeDoc.exists) {
      const data = viajeDoc.data() as Viaje; // Cast de `data` al tipo `Viaje`
      
      // Verifica si existe `pasajerosEstados` y si el estado del usuario es "confirmado"
      if (data.pasajerosEstados && data.pasajerosEstados[userId]?.estado === 'confirmado') {  
        this.qrEscaneado = true; // Actualiza la variable para reflejar el estado confirmado en la interfaz
        this.presentToast('Estado confirmado: Estás en ruta para el viaje.');
      } else {
        this.presentToast('Error: El estado no ha sido actualizado a "confirmado".', 'danger');
      }
    } else {
      this.presentToast('Error: No se encontró el viaje.', 'danger');
    }
  }
  
  

  loadMap() {
    this.map = L.map('mapId').setView([this.origenLat, this.origenLng], 17); 
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      noWrap: true,
    }).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');
  }

  clearRoute() {
    if (this.rutaCapa) {
      this.map.removeLayer(this.rutaCapa);
      this.rutaCapa = null;
    }
  }

 
  async geocodeDestino(direccionCompleta: string) {
    const loader = new Loader({ apiKey: this.apiKey });
    
    loader.load().then(async () => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: direccionCompleta }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          this.destinoLat = location.lat();
          this.destinoLng = location.lng();
          this.addRoute();
        } else {
          console.error("No se encontró la dirección especificada.");
        }
      });
    });
  }

  cargarViajesEnEspera() {
    this.fireStore.collection('viajes', ref => ref.where('estado', '==', 'en espera'))
      .valueChanges()
      .subscribe(viajes => {
        this.viajes = viajes;
      });
  }

  // Función para seleccionar un viaje y redirigir al home con el destino seleccionado
  selectViaje(viaje: any) {
    this.router.navigate(['/pasajero-home'], { queryParams: { destino: viaje.destino } });
  }
  
  addRoute() {
    if (this.destinoLat && this.destinoLng) {

      this.clearRoute(); 
  
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: new google.maps.LatLng(this.origenLat, this.origenLng),
        destination: new google.maps.LatLng(this.destinoLat, this.destinoLng),
        travelMode: google.maps.TravelMode.DRIVING
      };
  
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const route = result.routes[0];
          const points: [number, number][] = [];
  

          route.legs.forEach(leg => {
            leg.steps.forEach(step => {
              const path = step.path;
              path.forEach(latLng => {
                points.push([latLng.lat(), latLng.lng()]);
              });
            });
          });
  

          this.rutaCapa = L.polyline(points, { color: 'blue' }).addTo(this.map);
          this.map.fitBounds(this.rutaCapa.getBounds());
        } else {
          console.error("Error al obtener la ruta:", status);
        }
      });
    }
  }

    async obtenerMapaEstaticoConRuta(origenLat: number, origenLng: number, destinoLat: number, destinoLng: number): Promise<string> {
      const apiKey = this.apiKey;
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x800&maptype=roadmap&markers=color:blue|label:O|${origenLat},${origenLng}&markers=color:red|label:D|${destinoLat},${destinoLng}&path=color:0x0000ff|weight:5|${origenLat},${origenLng}|${destinoLat},${destinoLng}&key=${apiKey}`;
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
            await this.fireStore.collection('viajes').doc(viajeId).update({
              imagenMapa: downloadURL
            });
            
            resolve(); // Resolviendo la promesa después de guardar la imagen
          } catch (error) {
            reject(error); // Rechaza la promesa si ocurre un error
            console.error("Error al guardar la imagen en Firebase Storage:", error);
          }
        }, (error) => {
          reject(error); // Rechaza la promesa si ocurre un error en la solicitud HTTP
          console.error("Error al descargar la imagen del mapa estático:", error);
        });
      });
    }
    
    async aceptarViaje(viaje: any) {
      try {
        await this.capturarMapaEstaticoYGuardar(viaje.id); // Espera a que se guarde la imagen
        this.router.navigate([`/pj-aceptarviaje/${viaje.id}`]); // Redirige solo después de guardar
      } catch (error) {
        console.error("Error en aceptarViaje:", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }

    /*async startScan() {
      const modal = await this.modalController.create({
        component: BarcodeScanningModalComponent,
        cssClass: 'barcode-scanner-modal',
        showBackdrop: false,
        componentProps: {
          formats: [],
          LensFacing: LensFacing.Back
        }
      });
    
      await modal.present();
    
      // Después de leer el QR
      const { data } = await modal.onDidDismiss();
    
      // Si el QR contiene información
      if (data?.barcode?.displayValue) {
        this.resultadoQR = data.barcode.displayValue;  
    
        // Obtener el UID del pasajero autenticado
        this.authService.isLogged().subscribe(async (user) => {
          if (user) {
            try {
              // Registrar el pasajero en el viaje utilizando el ID obtenido del QR
              await this.viajesService.addPasajero(this.resultadoQR, user.uid);
              this.presentToast('Te has unido al viaje correctamente.');
  
              setTimeout(() => {
                // this.router.navigate(['/pj-qr', this.resultadoQR]);  
              }, 1000);  
              
            } catch (error) {
              this.presentToast('Error al unirse al viaje', 'danger');
            }
          }
        });
      } else {
        this.presentToast('No se pudo escanear el código QR. Inténtalo de nuevo.', 'danger');
      }
    }*/

      async startScan() {
        const modal = await this.modalController.create({
          component: BarcodeScanningModalComponent,
          cssClass: 'barcode-scanner-modal',
          showBackdrop: false,
          componentProps: {
            formats: [],
            LensFacing: LensFacing.Back
          }
        });
      
        await modal.present();
      
        const { data } = await modal.onDidDismiss();
      
        if (data?.barcode?.displayValue) {
          this.resultadoQR = data.barcode.displayValue;
      
          this.authService.isLogged().subscribe(async (user) => {
            if (user) {
              try {
                // Actualizar el estado del pasajero en Firebase a "confirmado"
                await this.fireStore.collection('viajes').doc(this.resultadoQR).update({
                  [`pasajerosEstados.${user.uid}.estado`]: 'confirmado'
                });
      
                // Llama a confirmarEstadoPasajero para verificar el estado en la interfaz
                this.confirmarEstadoPasajero(this.resultadoQR, user.uid);
      
              } catch (error) {
                this.presentToast('Error al unirse al viaje', 'danger');
              }
            }
          });
        } else {
          this.presentToast('No se pudo escanear el código QR. Inténtalo de nuevo.', 'danger');
        }
      }
      

    // Método para mostrar un toast de notificación
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
    
  
  
}