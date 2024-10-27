import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checklogin();
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        const usuarioLogeado = await this.fireStore
          .collection('usuarios')
          .doc(user.uid)
          .get()
          .toPromise();
        const usuarioData = usuarioLogeado?.data();

        if (usuarioData) {
          this.uidPasajero = user.uid;
          this.config();
        }
      }
    });
  }

  config() {
    console.log('uidPasajero:', this.uidPasajero);

    if (!this.uidPasajero) {
      console.error('uidPasajero no está definido');
      return;
    }

    this.fireStore
      .collection(
        'viajes',
        (ref) =>
          ref
            .where('estado', '==', 'finalizado')
            .where('pasajerosUids', 'array-contains', this.uidPasajero)
      )
      .valueChanges()
      .subscribe({
        next: (aux) => {
          this.viajes = aux;
        },
        error: (err) => {
          console.error('Error al obtener viajes:', err);
        },
      });
  }

  selectViaje(viaje: any) {
    this.router.navigate(['/pasajero-home'], {
      queryParams: { destino: viaje.destino },
    });
  }
}
