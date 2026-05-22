import { PersonaCrearDTO } from '../../../clinica/pacientes/interface/paciente.interface';

export interface PersonaRef {
  id: number;
}

export interface RolRef {
  id: number;
}

export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
}

export interface UsuarioLeer {
  id: number;
  persona: PersonaRef;
  rol: RolRef;
  usuario: string;
  estado: number;
}

export interface UsuarioCrearDTO {
  persona: PersonaRef;
  rol: RolRef;
  usuario: string;
  claveAcceso: string;
  estado: number;
}

export interface UsuarioCrearCompleto {
  persona: PersonaCrearDTO;
  rolId: number;
  usuario: string;
  claveAcceso: string;
  estado: number;
}
