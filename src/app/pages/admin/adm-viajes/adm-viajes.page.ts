import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-adm-viajes',
  templateUrl: './adm-viajes.page.html',
  styleUrls: ['./adm-viajes.page.scss'],
})
export class AdmViajesPage implements OnInit {

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
