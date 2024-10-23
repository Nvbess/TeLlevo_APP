import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-lista-pas',
  templateUrl: './lista-pas.page.html',
  styleUrls: ['./lista-pas.page.scss'],
})
export class ListaPasPage implements OnInit {

  count: number = 0; 

  usuarios: any = [];

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.config();
  }

  config() {
    this.firestore.collection('usuarios', ref => ref.where('tipo', '==', 'pasajero'))
      .valueChanges()
      .subscribe(aux => {
        this.usuarios = aux;
        this.contarUsuarios()
      });
  }

  contarUsuarios() {
    this.firestore.collection('usuarios', ref => ref.where('tipo', '==', 'pasajero')).get().subscribe((snapshot) => {
      this.count = snapshot.size;
    });
  }

}
