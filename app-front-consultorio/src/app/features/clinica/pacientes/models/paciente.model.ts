export interface MensajeResponse<T> {
  mensaje: string;
  object: T;
}

export interface Paciente {
  id: number;
  dni: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  nacionalidad: string;
  correo: string;
  entidadAseguradora: string;
  codigoAseguradora: string;
  estado: number;
}
