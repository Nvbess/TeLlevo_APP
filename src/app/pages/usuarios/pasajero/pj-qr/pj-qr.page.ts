import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pj-qr',
  templateUrl: './pj-qr.page.html',
  styleUrls: ['./pj-qr.page.scss'],
})
export class PjQrPage implements OnInit {

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public idUsuario?: number;
  viajeId: string | null = null;
  public viajes: any = [];

  map: any;
  origenLat = -33.598449986499055;  
  origenLng = -70.57880611157175;
  destinoLat!: number;
  destinoLng!: number;
  rutaCapa: any = null;
  apiKey = environment.googleApiKey;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private http: HttpClient
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
        }
      }
    });
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
              imagenmapa: downloadURL
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
    
    async aceptarViaje(viaje: any) {
      try {
        await this.capturarMapaEstaticoYGuardar(viaje.id); 
        this.router.navigate([`/pj-aceptarviaje/${viaje.id}`]); 
      } catch (error) {
        console.error("Error en aceptarViaje:", error);
        
      }
    }
    
    cancelarViaje() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar viaje',
        cancelButtonText: 'No, mantener viaje',
        heightAuto: false  
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.viajeId) {
            this.fireStore.collection('viajes').doc(this.viajeId).delete().then(() => {
              Swal.fire({
                title: 'Cancelado',
                text: 'El viaje ha sido cancelado.',
                icon: 'success',
                confirmButtonText: 'OK',
                heightAuto: false  
              }).then(() => {
                this.router.navigate(['/pasajero-home']);
              });
            });
          }
        }
      });
    }
  
  
}