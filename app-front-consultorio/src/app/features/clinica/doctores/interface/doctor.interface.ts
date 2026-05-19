export interface Doctor {
  id?: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  cmp: string;
  turno: 'Mañana' | 'Tarde' | 'Noche' | 'Completo';
  estado: 'activo' | 'inactivo';
  rating: number;
  pacientesAtendidos: number;
  telefono: string;
  email: string;
  diasAtencion: string[];
}

export interface Persona {
  id: number;
  dni: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  nacionalidad: string;
  correo: string;
}

export interface Especialidad {
  nombre: string;
}

export interface DoctorDetalle {
  id: number;
  persona: Persona;
  cpm: string;
  rne: string;
  consejoRegional: string;
  especialidad: Especialidad;
  estado: number;
}
