export interface Usuario {
  uid: string;
  nombre: string;
  apellido: string;
  email: string;
  estado: string;
  pass: string;
  celular: string;
  tipo: string;
  modeloAuto?: string;
  patenteAuto?: string;
}