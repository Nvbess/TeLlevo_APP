export interface Usuario {
  uid: string;
  nombre: string;
  apellido: string;
  email: string;
  pass: string;
  celular: string;
  tipo: string;
  modeloAuto?: string;
  patenteAuto?: string;
}