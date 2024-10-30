export interface Viaje {
  id?: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  costo: number;
  capacidad: number;
  asientos_disponibles: number;
  conductorUid: string;
  pasajerosUids: string[];
  pasajerosEstados: { [uid: string]: { estado: string } };
  imagenMapa?: string;
  estado: string;
}
