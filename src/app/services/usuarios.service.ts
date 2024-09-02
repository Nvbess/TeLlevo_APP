import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios = [
    {'email':'admin@admin.cl','pass':'admin123','tipo':'admin',},
    {'email':'pasajero@user.cl','pass':'user123','tipo':'pasajero',},
    {'email':'conductor@user.cl','pass':'user123','tipo':'conductor',}
  ]

  constructor() { }

  getUsuarios() {
    return this.usuarios;
  }

  getUsuario() {

  }

  addUsuario(usuario: Usuario) {
    this.usuarios.push(usuario)
  }

  delUsuario() {

  }

  updUsuario() {

  }

}
