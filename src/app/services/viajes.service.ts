import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  viajes: Viaje[] = [
    {
      id: 1,
      conductor: {
        email: "conductor@user.cl",
        pass: "user123",
        tipo: "conductor",
        nombre: "Carlos",
        apellido: "Sánchez",
        celular: "+56 9 3456 7890",
        uid: '3',
        modeloAuto: "Toyota",
        patenteAuto: "XYZ123"
      },
      pasajeros: [
        {
          email: "pasajero@user.cl",
          pass: "user123",
          tipo: "pasajero",
          nombre: "Ana",
          apellido: "Gómez",
          celular: "+56 9 2345 6789",
          uid: '2'
        }
      ],
      origen: "Campus Norte",
      destino: "Calle Principal 123",
      fecha: "15 Ago.",
      hora: "14:00 p.m.",
      costo: 10500,
      capacidad: 4,
      asientos_disponibles: 3
    },
    {
      id: 2,
      conductor: {
        email: "conductor@user.cl",
        pass: "user123",
        tipo: "conductor",
        nombre: "Carlos",
        apellido: "Sánchez",
        celular: "+56 9 3456 7890",
        uid: '3',
        modeloAuto: "Toyota",
        patenteAuto: "XYZ123"
      },
      pasajeros: [],
      origen: "Campus Este",
      destino: "Calle Los Pinos 456",
      fecha: "18 Ago.",
      hora: "05:00 a.m.",
      costo: 3000,
      capacidad: 4,
      asientos_disponibles: 4
    }
  ];

  constructor() { }

  getViajes(): Viaje[] {
    return this.viajes;
  }

  getViaje(id: number): Viaje | undefined {
    return this.viajes.find(viaje => viaje.id === id);
  }

  addViaje() {
  }

  addPasajero() {
  }

  delViaje() {
  }

  updViaje() {
  }
}