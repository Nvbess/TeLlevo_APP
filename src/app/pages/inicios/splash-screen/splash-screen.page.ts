import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private fireStore: AngularFirestore,
    private MensajesService: MensajesService, 
    private platform: Platform,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.checklogin();
    }, 2000);
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        try {
          if (this.platform.is('hybrid')) {
            await this.checkHuellaDigital();
          }
  
          const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
          const usuarioData = usuarioLogeado?.data() as Usuario;
  
          if (usuarioData?.estado === 'deshabilitado') {
            await this.authService.logout();
            this.MensajesService.mensaje(
              'error',
              'Cuenta deshabilitada',
              'Tu cuenta ha sido deshabilitada. No puedes acceder a la aplicación.'
            );
            this.router.navigate(['inicio']);
            return;
          }
  
          if (usuarioData?.tipo === 'admin') {
            this.router.navigate(['/admin-home']);
          } else if (usuarioData?.tipo === 'pasajero') {
            this.router.navigate(['/pasajero-home']);
          } else if (usuarioData?.tipo === 'conductor') {
            this.router.navigate(['/conductor-home']);
          }
  
        } catch (error) {
          console.error('Error en el checklogin:', error);
          this.router.navigate(['inicio']);
        }
      } else {
        this.router.navigate(['inicio']);
      }
    });
  }
  
  async checkHuellaDigital() {
    try {
      await NativeBiometric.verifyIdentity({
        reason: 'Por favor, autenticate para continuar',
        title: 'Autenticación Biométrica',
        subtitle: 'Usa tu huella o Face ID',
        description: 'Coloca tu huella digital en el sensor'
      });
    } catch (error) {
      throw error;
    }
  }
}
