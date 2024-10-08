import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-pj-profile',
  templateUrl: './pj-profile.page.html',
  styleUrls: ['./pj-profile.page.scss'],
})
export class PjProfilePage implements OnInit {

  usuario?: Usuario;
  userUid?: string = '';
  userEmail?: string | null;
  userNombre?: string | null;
  userApellido?: string | null;
  userCelular?: string | null;
  userID?: string | null;
  userTipo?: string | null;
  userModAuto?: string | null;
  userPatAuto?: string | null;

  constructor(
    private authService: AuthService,
    private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.authService.isLogged().subscribe(async (user)=> {
      if(user) {
        // Logeado
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.usuario = usuarioData;
          this.userEmail = usuarioData.email;
          this.userNombre = usuarioData.nombre;
          this.userApellido = usuarioData.apellido;
          this.userCelular = usuarioData.celular;
          this.userUid = usuarioData.uid;
          this.userTipo = usuarioData.tipo;
          this.userModAuto = usuarioData.modeloAuto;
          this.userPatAuto = usuarioData.patenteAuto;
        }
      }
    })
}

}
