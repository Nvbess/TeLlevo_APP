import { Usuario } from "./usuario";

export interface Viaje {
    id: number,
    conductor: Usuario,
    pasajeros: Usuario[],
    origen: string,
    destino: string,
    fecha_hora_salida: string,
    costo: number,
    capacidad: number,
    asientos_disponibles: number,
}
