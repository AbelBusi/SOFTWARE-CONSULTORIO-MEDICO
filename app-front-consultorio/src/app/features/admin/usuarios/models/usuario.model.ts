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
  nombre: string;
  correo: string;
  usuario: string;
  nombreRol: string;
  estado: number;
}

export interface UsuarioCrearDTO {
  persona: PersonaRef;
  rol: RolRef;
  usuario: string;
  claveAcceso: string;
  estado: number;
}
