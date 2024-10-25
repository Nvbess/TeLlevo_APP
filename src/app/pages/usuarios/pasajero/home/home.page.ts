import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

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
  rutaCapa: any;  // Referencia para la ruta dibujada
  apiKey = 'AIzaSyBcRMif7zFwRxG5uDWZeGradSVnT-WGmd0';  // Clave de API de Google

  constructor(
    private router: Router,
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private route: ActivatedRoute,
    private http: HttpClient  // Para usar HttpClient en la solicitud a Google Geocoding API
  ) {}

  ionViewDidEnter() {
    // Cargar el mapa en la vista
    this.loadMap(); 
  }

  ngOnInit() {
    this.menuController.enable(true);
    this.checklogin();

    // Capturar el destino desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['destino']) {
        this.geocodeDestinoGoogle(params['destino']);
      }
    });

    // Limpiar la ruta al navegar de regreso
    this.router.events.subscribe(() => {
      this.clearRoute();
    });
  }

  // Verificar si el usuario está logueado
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

  // Cargar el mapa sin rutas al inicio
  loadMap() {
    this.map = L.map('mapId').setView([this.origenLat, this.origenLng], 17); 
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      noWrap: true,
    }).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');
  }

  // Limpiar la ruta del mapa
  clearRoute() {
    if (this.rutaCapa) {
      this.map.removeLayer(this.rutaCapa);
      this.rutaCapa = null;
    }
  }

  // Función para convertir la dirección de destino en coordenadas usando Google Geocoding API
  geocodeDestinoGoogle(direccionCompleta: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccionCompleta)}&key=${this.apiKey}`;

    this.http.get(url).subscribe((response: any) => {
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        this.destinoLat = location.lat;
        this.destinoLng = location.lng;
        this.addRoute();  // Llamamos a la función para agregar la ruta en el mapa
      } else {
        console.error("No se encontró la dirección especificada o hubo un problema con la solicitud.");
      }
    }, (error) => {
      console.error("Error en la geocodificación:", error);
    });
  }
  

  // Agregar la ruta en el mapa desde el origen al destino
  addRoute() {
    this.rutaCapa = L.polyline([[this.origenLat, this.origenLng], [this.destinoLat, this.destinoLng]], {
      color: 'blue',
      weight: 4,
      opacity: 0.7
    }).addTo(this.map);

    // Ajustamos la vista del mapa para que se vea toda la ruta
    this.map.fitBounds(this.rutaCapa.getBounds());
  }

}