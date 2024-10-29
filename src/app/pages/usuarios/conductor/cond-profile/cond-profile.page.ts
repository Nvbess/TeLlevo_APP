import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-cond-profile',
  templateUrl: './cond-profile.page.html',
  styleUrls: ['./cond-profile.page.scss'],
})
export class CondProfilePage implements OnInit {

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
    private fireStore: AngularFirestore,
    private MensajesService: MensajesService,
    private router: Router,) { }

  ngOnInit() {
    this.authService.isLogged().subscribe(async (user)=> {
      if(user) {
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

        if (usuarioData.estado === 'deshabilitado') {
          await this.authService.logout();
          this.MensajesService.mensaje('error', 'Cuenta deshabilitada', 'Tu cuenta ha sido deshabilitada. No puedes acceder a la aplicación.');
          this.router.navigate(['/inicio']);
        }
      }
    })
}

}
