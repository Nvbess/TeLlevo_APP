import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private nextId: number = 1;

  usuarios = [
    {
        "email": "admin@admin.cl",
        "pass": "admin123",
        "tipo": "admin",
        "nombre": "Juan",
        "apellido": "Pérez",
        "celular": "+56 9 1234 5678",
        "id": 1
    },
    {
        "email": "pasajero@user.cl",
        "pass": "user123",
        "tipo": "pasajero",
        "nombre": "Ana",
        "apellido": "Gómez",
        "celular": "+56 9 2345 6789",
        "id": 2
    },
    {
        "email": "conductor@user.cl",
        "pass": "user123",
        "tipo": "conductor",
        "nombre": "Carlos",
        "apellido": "Sánchez",
        "celular": "+56 9 3456 7890",
        "id": 3
    }
]

  constructor() { }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuario() {

  }

  addUsuario(usuario: Omit<Usuario, 'id'>): Usuario {
    const newUsuario: Usuario = { ...usuario, id: this.nextId++ };
    this.usuarios.push(newUsuario);
    return newUsuario;
  }

  delUsuario() {

  }

  updUsuario() {

  }

}
