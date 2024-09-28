import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [];

  constructor() { }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuario(email: string): Usuario | undefined {
    return this.usuarios.find(aux => aux.email === email);
  }

  addUsuario() {
  }

  delUsuario() {
  }

  updUsuario() {
  }

}
