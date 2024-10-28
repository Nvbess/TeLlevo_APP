import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from '../pj-aceptarviaje/barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pj-qr',
  templateUrl: './pj-qr.page.html',
  styleUrls: ['./pj-qr.page.scss'],
})
export class PjQrPage implements OnInit {

  resultadoQR = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router : Router
  ) { }

  ngOnInit() {
    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
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

    // DESPUES DE LLER QR
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
