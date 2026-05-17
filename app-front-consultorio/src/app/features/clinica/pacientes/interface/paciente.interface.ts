export interface PacienteInterface {
  id: number;
  dni: string;
  paciente: string;
  genero: string;
  telefono: string;
  entidadAseguradora: string;
  estado: number;
}

export interface PersonaLeerDTO {
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

export interface PacienteDetalleLeerDTO {
  id: number;
  persona: PersonaLeerDTO;
  entidadAseguradora: string;
  codigoAseguradora: string;
  estado: number;
}
