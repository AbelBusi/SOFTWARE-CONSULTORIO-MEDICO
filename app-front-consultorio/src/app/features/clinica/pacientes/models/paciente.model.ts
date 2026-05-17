import { PacienteInterface } from '../interface/paciente.interface';

export interface MensajeResponse {
  mensaje: string;
  object: PacienteInterface[];
}

export interface MensajeResponseSingle {
  mensaje: string;
  object: PacienteInterface;
}
