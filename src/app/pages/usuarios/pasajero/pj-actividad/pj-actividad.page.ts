import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';


@Component({
  selector: 'app-pj-actividad',
  templateUrl: './pj-actividad.page.html',
  styleUrls: ['./pj-actividad.page.scss'],
})
export class PjActividadPage implements OnInit {

  viajes: any = [];

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.config()
  }

  config(){
    this.fireStore.collection('viajes').valueChanges().subscribe(aux => {
      this.viajes = aux;
    });
  }

}