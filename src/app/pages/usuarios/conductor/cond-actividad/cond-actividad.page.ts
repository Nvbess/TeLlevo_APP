import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';

@Component({
  selector: 'app-cond-actividad',
  templateUrl: './cond-actividad.page.html',
  styleUrls: ['./cond-actividad.page.scss'],
})
export class CondActividadPage implements OnInit {

  viajes: any = [];

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.config()
  }

  config() {
    this.fireStore.collection('viajes', ref => 
      ref.orderBy('fecha', 'desc')
    ).valueChanges().subscribe(viajes => {
      this.viajes = viajes;
    });
  }

}
