export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
  seguro: string;
  grupoSanguineo: string;
  alergias: string[];
  ultimaCita: string;
  estado: 'activo' | 'inactivo';
}
