import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-lista-cond',
  templateUrl: './lista-cond.page.html',
  styleUrls: ['./lista-cond.page.scss'],
})
export class ListaCondPage implements OnInit {

  count: number = 0; 
  usuarios: any = [];

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.config();
  }

  config() {
    this.firestore.collection('usuarios', ref => ref.where('tipo', '==', 'conductor'))
      .valueChanges()
      .subscribe(aux => {
        this.usuarios = aux;
        this.contarUsuarios()
      });
  }

  contarUsuarios() {
    this.firestore.collection('usuarios', ref => ref.where('tipo', '==', 'conductor')).get().subscribe((snapshot) => {
      this.count = snapshot.size;
    });
  }

}

