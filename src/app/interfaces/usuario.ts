export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  pass: string;
  celular: string;
  tipo: 'admin' | 'pasajero' | 'conductor';
  modeloAuto?: string;
  patenteAuto?: string;
}