import { PersonaCrearDTO } from '../../pacientes/interface/paciente.interface';

export interface RecepcionistaLeer {
  id: number;
  codigoEmpleado: string;
  nombre: string;
  apellidos: string;
  genero: string;
  estado: number;
}

export interface RecepcionistaCrearDTO {
  persona: PersonaCrearDTO;
  codigoEmpleado: string;
  estado?: number;
}

export interface RecepcionistaActualizarDTO {
  persona: PersonaCrearDTO;
  codigoEmpleado: string;
  estado?: number;
}
