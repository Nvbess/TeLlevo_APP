import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.isLogged().toPromise();
    if (user) {
      const usuarioRef = this.firestore.collection('usuarios').doc(user.uid);
      const usuarioSnapshot = await usuarioRef.get().toPromise();
      const usuarioData = usuarioSnapshot?.data() as Usuario;

      if (usuarioData?.estado === 'deshabilitado') {
        await this.authService.logout();
        this.router.navigate(['inicio']);
        return false;
      }
      return true;
    }
    this.router.navigate(['inicio']);
    return false;
  }
}
