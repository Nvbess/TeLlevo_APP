import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
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
        // Logeado
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if ( usuarioData.tipo === 'admin' ) {
          this.router.navigate(['/admin-home']);
        } else if ( usuarioData.tipo === 'pasajero' ) {
          this.router.navigate(['/pasajero-home']);
        } else {
          this.router.navigate(['/conductor-home']);
        }

      } else {
        // No Logeado
        this.router.navigate(['inicio']);
      }
    })
  }

}
