import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';


@Component({
  selector: 'app-pj-actividad',
  templateUrl: './pj-actividad.page.html',
  styleUrls: ['./pj-actividad.page.scss'],
})
export class PjActividadPage implements OnInit {

  viajes: any = [];

  constructor(private fireStore: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.config()
  }

  config() {
    this.fireStore.collection('viajes', ref => ref.where('estado', '==', 'en espera'))
      .valueChanges()
      .subscribe(aux => {
        this.viajes = aux;
      });
  }

  selectViaje(viaje: any) {
    this.router.navigate(['/pasajero-home'], { queryParams: { destino: viaje.destino } });
  }

}