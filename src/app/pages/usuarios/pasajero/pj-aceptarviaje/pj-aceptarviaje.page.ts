import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-pj-aceptarviaje',
  templateUrl: './pj-aceptarviaje.page.html',
  styleUrls: ['./pj-aceptarviaje.page.scss'],
})
export class PjAceptarviajePage implements OnInit {

  viajeId?: string;
  imagenMapa?: string;
  resultadoQR = '';

  constructor(private route: ActivatedRoute, 
              private fireStore: AngularFirestore,
              private platform: Platform,
              private modalController: ModalController,
              private router: Router
            ) { }

  ngOnInit() {
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
