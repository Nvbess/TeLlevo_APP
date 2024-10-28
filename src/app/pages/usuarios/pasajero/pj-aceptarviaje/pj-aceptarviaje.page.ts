import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-pj-aceptarviaje',
  templateUrl: './pj-aceptarviaje.page.html',
  styleUrls: ['./pj-aceptarviaje.page.scss'],
})
export class PjAceptarviajePage implements OnInit {

  viaje?: Viaje;
  viajeId?: string;
  viajeFecha?: string | null;
  viajeHora?: string | null;
  viajeCosto?: number | null;
  viajeID?: string | null;
  conductorID?: string | null;
  nombreConductor?: string | null;
  apellidoConductor?: string | null;
  pasajeroIDs?: string[] | null;
  nombrePasajero?: string | null;
  apellidoPasajero?: string | null;
  viajeOrigen?: string | null;
  viajeDestino?: string | null;
  viajeEstado?: string | null;
  imagenMapa?: string;
  resultadoQR = '';

  constructor(private route: ActivatedRoute, 
              private fireStore: AngularFirestore,
              private platform: Platform,
              private modalController: ModalController,
              private router: Router,
              private authService: AuthService,
              private viajesService: ViajesService,  
              private toastController: ToastController
            ) { }

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('id') as string;

    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
    
    if (this.viajeId) {
      this.fireStore.collection('viajes', ref => ref.where('id', '==', this.viajeId)).get().subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const viajeData = doc.data() as Viaje;
  
          this.viaje = viajeData;
          this.viajeFecha = viajeData.fecha;
          this.viajeHora = viajeData.hora;
          this.viajeCosto = viajeData.costo;
          this.viajeID = viajeData.id;
          this.conductorID = viajeData.conductorUid;
          this.pasajeroIDs = viajeData.pasajerosUids;
          this.viajeOrigen = viajeData.origen;
          this.viajeDestino = viajeData.destino;
          this.viajeEstado = viajeData.estado;
  
          this.fireStore.collection('usuarios').doc(this.conductorID).get().toPromise().then((userDoc) => {
            if (userDoc?.exists) {
              const userData = userDoc.data() as Usuario;
              this.nombreConductor = userData.nombre;
              this.apellidoConductor = userData.apellido;
            }
          });
  
          this.pasajeroIDs?.forEach((pasajeroID: string) => {
            this.fireStore.collection('usuarios').doc(pasajeroID).get().toPromise().then((userDoct) => {
              if (userDoct?.exists) {
                const userData = userDoct.data() as Usuario;
                this.nombrePasajero = userData.nombre;
                this.apellidoPasajero = userData.apellido;
              }
            });
          });
        }
      });
    }  

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.viajeId = id;
      this.cargarImagenMapa();
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

  cargarImagenMapa() {
    // Obtener la URL de la imagen almacenada en Firebase para el viaje
    this.fireStore.collection('viajes').doc(this.viajeId).valueChanges().subscribe((viaje: any) => {
      this.imagenMapa = viaje?.imagenMapa || '';  
    });
  }

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
  }

}
