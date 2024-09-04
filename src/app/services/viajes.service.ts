import { Injectable } from '@angular/core';
import { Viaje } from '../interfaces/viaje';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private nextId: number = 1;

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
        id: 3
      },
      pasajeros: [],
      origen: "Campus Norte",
      destino: "Calle Principal 123",
      fecha_hora_salida: "2024-09-01T17:30:00",
      costo: 1500,
      capacidad: 4,
      asientos_disponibles: 4
    },
    {
      id: 2,
      conductor: {
        email: "conductor2@user.cl",
        pass: "user123",
        tipo: "conductor",
        nombre: "Lucía",
        apellido: "Martínez",
        celular: "+56 9 4567 8910",
        id: 4
      },
      pasajeros: [],
      origen: "Campus Sur",
      destino: "Av. Siempre Viva 742",
      fecha_hora_salida: "2024-09-01T18:00:00",
      costo: 2000,
      capacidad: 3,
      asientos_disponibles: 3
    },
    {
      id: 3,
      conductor: {
        email: "conductor3@user.cl",
        pass: "user123",
        tipo: "conductor",
        nombre: "Pedro",
        apellido: "López",
        celular: "+56 9 5678 9123",
        id: 5
      },
      pasajeros: [],
      origen: "Campus Este",
      destino: "Calle Los Pinos 456",
      fecha_hora_salida: "2024-09-01T19:15:00",
      costo: 1800,
      capacidad: 5,
      asientos_disponibles: 5
    }
  ];

  constructor() { }

  getViajes(): Viaje[] {
    return this.viajes;
  }

  getViaje(id: number): Viaje | undefined {
    return this.viajes.find(viaje => viaje.id === id);
  }

  addViaje(viaje: Omit<Viaje, 'id' | 'plazas_disponibles'>): Viaje {
    const newViaje: Viaje = { 
      ...viaje, 
      id: this.nextId++, 
      asientos_disponibles: viaje.capacidad 
    };
    this.viajes.push(newViaje);
    return newViaje;
  }

  addPasajero(id: number, pasajero: Usuario): string {
    const viaje = this.getViaje(id);
    if (viaje && viaje.asientos_disponibles > 0) {
      viaje.pasajeros.push(pasajero);
      viaje.asientos_disponibles--;
      return 'Pasajero añadido con éxito';
    } else if (viaje) {
      return 'No hay plazas disponibles';
    } else {
      return 'Viaje no encontrado';
    }
  }

  delViaje(id: number): boolean {
    const index = this.viajes.findIndex(viaje => viaje.id === id);
    if (index !== -1) {
      this.viajes.splice(index, 1);
      return true;
    }
    return false;
  }

  updViaje(id: number, updatedViaje: Partial<Viaje>): Viaje | undefined {
    const viaje = this.getViaje(id);
    if (viaje) {
      Object.assign(viaje, updatedViaje);
      return viaje;
    }
    return undefined;
  }
}

