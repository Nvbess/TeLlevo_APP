import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Subscription } from 'rxjs';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [InAppBrowser]
})
export class HomePage implements OnInit {

  viajes: any = [];
  viajeEnCurso: Viaje | null = null;
  viajeEnEspera: Viaje | null = null;

  destinoLat?: number;
  destinoLng?: number;

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;
  public conductorUid?: string;

  private viajeEnCursoSubscription: Subscription | undefined;
  private viajeEnEsperaSubscription: Subscription | undefined;


  constructor(
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private router: Router,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.config();
    this.menuController.enable(true);
    this.checklogin();
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
          this.conductorUid = usuarioData.uid;
          this.config();

          this.viajeEnEsperaSubscription = this.viajesService.getViajeEnEspera(user.uid).subscribe(viajes => {
            this.viajeEnEspera = viajes.length > 0 ? viajes[0] : null;
          });
          this.viajeEnCursoSubscription = this.viajesService.getViajeEnCurso(user.uid).subscribe(viajes => {
            this.viajeEnCurso = viajes.length > 0 ? viajes[0] : null;

            if (this.viajeEnCurso) {
              this.obtenerDatosViaje();
            }
          })
        }
      }
    });
  }

  config() {
    if (this.conductorUid) {
      this.fireStore.collection('viajes', ref => 
        ref.where('conductorUid', '==', this.conductorUid).orderBy('fecha', 'desc').limit(3)
      ).valueChanges().subscribe(viajes => {
        if (viajes.length > 0) {
          this.viajes = viajes;
        }
      });
    }
  }

  finalizarViaje() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar viaje',
      cancelButtonText: 'No, mantener viaje',
      heightAuto: false  
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.viajeEnCurso?.id) {
          this.fireStore.collection('viajes').doc(this.viajeEnCurso?.id).update({
            estado: 'finalizado'
          }).then(() => {
            Swal.fire({
              title: 'Finalizado',
              text: 'El viaje ha sido finalizado con éxito.',
              icon: 'success',
              confirmButtonText: 'OK',
              heightAuto: false  
            }).then(() => {
              this.router.navigate(['/conductor-home']);
            });
          });
        }
      }
    });
  }

  

  async obtenerDatosViaje() {
    const destino = this.viajeEnCurso?.destino;
    if (typeof destino === 'string' && destino.trim() !== '') {
      try {
        const coordenadas = await this.viajesService.obtenerCoordenadas(destino);
        this.destinoLat = coordenadas.lat;
        this.destinoLng = coordenadas.lng;
        console.log(`Latitud: ${this.destinoLat}, Longitud: ${this.destinoLng}`);
      } catch (error) {
        console.error("Error al obtener coordenadas:", error);
      }
    } else {
      console.error("El destino no es válido");
    }
  }

  openWaze() {
    if (this.destinoLat !== undefined && this.destinoLng !== undefined) {
      const url = `https://waze.com/ul?ll=${this.destinoLat},${this.destinoLng}&navigate=yes`;
      this.iab.create(url, '_system');
    } else {
      console.error("Coordenadas no definidas");
    }
  }


}
