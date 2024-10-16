import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';

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
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.checklogin();
    }, 2000);
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user)=> {
      if(user) {
        try {
          await this.checkHuellaDigital();
            // Logeado con huella
          const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
          const usuarioData = usuarioLogeado?.data() as Usuario;

          if ( usuarioData.tipo === 'admin' ) {
            this.router.navigate(['/admin-home']);
          } else if ( usuarioData.tipo === 'pasajero' ) {
            this.router.navigate(['/pasajero-home']);
          } else {
            this.router.navigate(['/conductor-home']);
          }
        } catch (error) {
          // Sin huella
          this.router.navigate(['inicio']);
        }
      } else {
        // No Logeado
        this.router.navigate(['inicio']);
      }
    })
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
      throw error; // Forzar el error
    }
  }


}
