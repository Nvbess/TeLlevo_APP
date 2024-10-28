import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from 'src/app/interfaces/viaje';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth, private fireStore: AngularFirestore, private ViajesService: ViajesService,
  ) { }


  // OBTENER USUARIO CONECTADO
  getUsuario() {
      return this.angularFireAuth.currentUser;
  }

  // LOGIN
  login(email: string, pass: string,) {
    return this.angularFireAuth.signInWithEmailAndPassword(email,pass);
  }

  // OBTENER USUARIO CONECTADO
  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  // REGISTER
  register(email: string, pass: string,) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,pass);
  }

  // DESLOGEAR
  logout() {
    return this.angularFireAuth.signOut();
  }

  // RECUPERAR CONTRASENA
  recoveryPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email).then(() => {
      console.log('Correo enviado!');
    }).catch((error) => {
      console.log('Error al enviar el correo!');
      throw error;
    });
  }

  // Usuario Deshabilitado
  async deshabilitarUsuario(uid: string) {
    await this.fireStore.collection('usuarios').doc(uid).update({
      estado: 'deshabilitado'
    });
    console.log(`Usuario con UID ${uid} ha sido deshabilitado`);
    this.ViajesService.deshabilitarUsuarioEnViajes(uid);
  }
}
