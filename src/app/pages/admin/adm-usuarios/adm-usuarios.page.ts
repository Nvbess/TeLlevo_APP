import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {

  count: number = 0;
  usuarios: any = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.config()
  }

  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe(aux => {
      this.usuarios = aux;
      this.contarUsuarios()
    });
}

contarUsuarios() {
  this.firestore.collection('usuarios').get().subscribe((snapshot) => {
    this.count = snapshot.size;
  });
}
}
