export interface Especialidad {
  id: number;
  nombre: string;
  descripcion: string;
  numDoctores: number;
  estado: 'activo' | 'inactivo';
  demanda: 'Alta' | 'Media' | 'Baja';
  piso: string;
}
