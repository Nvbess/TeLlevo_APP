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

  map: any;
  origenLat = -33.598449986499055;  // Coordenadas fijas de Duoc UC Puente Alto
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
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ionViewDidEnter() {
    this.loadMap(); 
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

  // Función para convertir la dirección de destino en coordenadas usando la API de Google Geocoding
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
  
  addRoute() {
    if (this.destinoLat && this.destinoLng) {
      // Eliminar la ruta anterior, si existe
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
  
          // Extraer los puntos de la ruta
          route.legs.forEach(leg => {
            leg.steps.forEach(step => {
              const path = step.path;
              path.forEach(latLng => {
                points.push([latLng.lat(), latLng.lng()]);
              });
            });
          });
  
          // Dibuja la ruta en el mapa de Leaflet
          this.rutaCapa = L.polyline(points, { color: 'blue' }).addTo(this.map);
          this.map.fitBounds(this.rutaCapa.getBounds());
        } else {
          console.error("Error al obtener la ruta:", status);
        }
      });
    }
  }
}