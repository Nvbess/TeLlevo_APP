import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';

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
              private router: Router,
              private authService: AuthService,
              private viajesService: ViajesService,  
              private toastController: ToastController
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
      this.imagenMapa = viaje?.imagenmapa || '';  
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
            await this.viajesService.addPasajero(this.resultadoQR, user.id);
            this.presentToast('Te has unido al viaje correctamente.');

            setTimeout(() => {
              this.router.navigate(['/pj-qr', this.resultadoQR]);  
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
