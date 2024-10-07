import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-pas',
  templateUrl: './lista-pas.page.html',
  styleUrls: ['./lista-pas.page.scss'],
})
export class ListaPasPage implements OnInit {

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
      });
  }

}
