import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

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

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await this.angularFireAuth.signInWithPopup(provider);
      return credential;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  async registerWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider);
  }

  loginWithGitHub() {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }
  
  isUserInTrip(userId: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.fireStore.collection('viajes', ref => 
        ref.where('pasajerosUids', 'array-contains', userId)
           .where('estado', 'in', ['en curso', 'en espera']) // Asegúrate de que estos sean los estados correctos
      ).valueChanges()
      .subscribe(viajes => {
        observer.next(viajes.length > 0); // Devuelve true si hay viajes donde el usuario está en curso o en espera
      });
    });
  }
  
}
