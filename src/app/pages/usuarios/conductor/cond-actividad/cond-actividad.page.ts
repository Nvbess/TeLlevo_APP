import { AuthService } from './../../../../services/firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cond-actividad',
  templateUrl: './cond-actividad.page.html',
  styleUrls: ['./cond-actividad.page.scss'],
})
export class CondActividadPage implements OnInit {

  viajes: any = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;
  public conductorUid?: string;

  constructor(
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.checklogin();
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.tipoUsuario = usuarioData.tipo;
          this.emailUsuario = usuarioData.email;
          this.nombreUsuario = usuarioData.nombre;
          this.apellUsuario = usuarioData.apellido;
          this.conductorUid = usuarioData.uid;
          this.config();
        }
      }
    });
  }

  config() {
    if (this.conductorUid) {
      this.fireStore.collection('viajes', ref => 
        ref.where('conductorUid', '==', this.conductorUid).orderBy('fecha', 'desc')
      ).valueChanges().subscribe(viajes => {
        if (viajes.length > 0) {
          this.viajes = viajes;
        }
      });
    }
  }
}
