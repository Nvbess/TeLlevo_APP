import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
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
              private router: Router
            ) { }

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('id') as string;

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
    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
  }

  cargarImagenMapa() {
    // Obtener la URL de la imagen almacenada en Firebase para el viaje
    this.fireStore.collection('viajes').doc(this.viajeId).valueChanges().subscribe((viaje: any) => {
      this.imagenMapa = viaje?.imagenmapa || '';  // Asegúrate de que imagenmapa exista en Firebase
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

    // DESPUES DE LEER QR
    const { data } = await modal.onDidDismiss();

    // SI SE OBTIENE INFORMACION EN DATA
    if (data?.barcode?.displayValue) {
      this.resultadoQR = data.barcode.displayValue;

      setTimeout(()=>{
        this.router.navigate(['', this.resultadoQR]) //Redirigir a pasajero en curso?
      }, 1000);
    }
  }

}
