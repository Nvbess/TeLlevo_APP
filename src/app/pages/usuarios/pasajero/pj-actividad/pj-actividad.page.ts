import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';


@Component({
  selector: 'app-pj-actividad',
  templateUrl: './pj-actividad.page.html',
  styleUrls: ['./pj-actividad.page.scss'],
})
export class PjActividadPage implements OnInit {

  viajes: any = [];
  uidPasajero?: string;

  constructor(
    private fireStore: AngularFirestore, 
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.config();
    this.checklogin();
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data();

        if (usuarioData) {
          this.uidPasajero = user.uid;  
          this.config(); 
        }
      }
    });
  }

  /*config() {
    this.fireStore.collection('viajes', ref => ref.where('estado', '==', 'en espera'))
      .valueChanges()
      .subscribe(aux => {
        this.viajes = aux;
      });
  }*/

  config() {
    this.fireStore.collection('viajes', ref =>
      ref.where('estado', '==', 'finalizado')
         .where('pasajeros', 'array-contains', this.uidPasajero)
    )
    .valueChanges()
    .subscribe(aux => {
      this.viajes = aux;
    });
  }



  selectViaje(viaje: any) {
    this.router.navigate(['/pasajero-home'], { queryParams: { destino: viaje.destino } });
  }

}