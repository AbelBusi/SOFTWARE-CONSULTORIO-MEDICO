export interface CitaMedicaLeer {
  id: number;
  nombrePaciente: string;
  apellidosPaciente: string;
  motivoConsulta: string;
  especialidad: string;
  diaConsulta: string;
  horaInicio: string;
  horaSalida: string;
  nombreDoctor: string;
  estado: number;
}

export interface MensajeResponse {
  mensaje: string;
  object: CitaMedicaLeer | CitaMedicaLeer[];
}

export interface CitaMedicaRefDTO {
  id: number;
}

export interface CitaMedicaCrearDTO {
  recepcionista: CitaMedicaRefDTO;
  paciente: CitaMedicaRefDTO;
  doctor: CitaMedicaRefDTO;
  especialidad: CitaMedicaRefDTO;
  motivo: string;
  fecha: string;
  horaInicio: string;
  horaSalida: string;
  costo: number;
  estado: number;
}
