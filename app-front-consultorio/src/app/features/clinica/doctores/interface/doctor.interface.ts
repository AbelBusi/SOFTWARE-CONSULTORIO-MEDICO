export interface Doctor {
  id?: number; // o string, según tu backend
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
