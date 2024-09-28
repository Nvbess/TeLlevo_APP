import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-det-usuarios',
  templateUrl: './det-usuarios.page.html',
  styleUrls: ['./det-usuarios.page.scss'],
})
export class DetUsuariosPage implements OnInit {

  usuario?: Usuario;
  userEmail?: string | null;
  userNombre?: string | null;
  userApellido?: string | null;
  userCelular?: string | null;
  userID?: string | null;
  userTipo?: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuariosService,
              private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.userEmail = this.activatedRoute.snapshot.paramMap.get('email');
    
    if (this.userEmail) {
      this.firestore.collection('usuarios', ref => ref.where('email', '==', this.userEmail)).get().subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const usuarioData = doc.data() as Usuario;
          
          this.usuario = usuarioData;
          this.userNombre = usuarioData.nombre;
          this.userApellido = usuarioData.apellido;
          this.userCelular = usuarioData.celular;
          this.userID = usuarioData.uid;
          this.userTipo = usuarioData.tipo;
        }
      });
    }
  }
}
