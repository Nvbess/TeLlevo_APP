import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';  // Importar el plugin de enrutamiento
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http'; // Para hacer las peticiones a Nominatim

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
  rutaCapa: any; // Referencia para la ruta dibujada

  constructor(
    private router: Router,
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private route: ActivatedRoute,
    private http: HttpClient, // Para usar la API de Nominatim
  ) {}

  ionViewDidEnter() {
    // Cargar el mapa en la vista
    this.loadMap(); 
  }

  ngOnInit() {
    this.menuController.enable(true);
    this.checklogin();

    // Capturamos el destino desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['destino']) {
        this.geocodeDestino(params['destino']);
      }
    });

    // Detectamos cuando el usuario presiona el botón de "Home" o cualquier otro evento de navegación
    this.router.events.subscribe(() => {
      this.clearRoute();  // Limpiar la ruta al navegar de regreso
    });
  }

  // Verificamos si el usuario está logueado
  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if(user) {
        // Si está logueado, obtenemos los datos del usuario desde Firestore
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.tipoUsuario = usuarioData.tipo;
          this.emailUsuario = usuarioData.email;
          this.nombreUsuario = usuarioData.nombre;
          this.apellUsuario = usuarioData.apellido;
        }
      }
    })
  }

  // Cargar el mapa sin rutas al inicio
  loadMap() {
    this.map = L.map('mapId').setView([this.origenLat, this.origenLng], 17); 
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      noWrap: true,
    }).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');
  }

  // Función para limpiar la ruta del mapa
  clearRoute() {
    if (this.rutaCapa) {
      this.map.removeLayer(this.rutaCapa);  // Remover la capa de la ruta del mapa
      this.rutaCapa = null;  // Asegurarse de limpiar la referencia a la capa
    }
  }

  // Función para convertir la dirección de destino en coordenadas usando Nominatim
  geocodeDestino(destino: string) {
    // Definimos una caja delimitadora que cubre Santiago de Chile
    const viewbox = "-70.9100,-33.4280,-70.5100,-33.7900";  // Oeste, Norte, Este, Sur de Santiago
  
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destino)}&viewbox=${viewbox}&bounded=1`;
    this.http.get(url).subscribe((data: any) => {
      if (data.length > 0) {
        // Obtenemos las coordenadas del destino
        this.destinoLat = data[0].lat;
        this.destinoLng = data[0].lon;
        this.addRoute();  // Llamamos a la función para agregar la ruta en el mapa
      }
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
