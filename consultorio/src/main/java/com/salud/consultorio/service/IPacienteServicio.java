package com.salud.consultorio.service;

import com.salud.consultorio.model.dto.*;
import com.salud.consultorio.model.entity.Paciente;

import java.util.List;

public interface IPacienteServicio extends IBasicoServicio<Paciente, PacienteCrearDTO,Integer>{


    List<NombrePacientesDTO> listarPacientesDtoList();

    LeerPacienteDTO traerPaciente(Integer id);

    List<LeerPacienteDTO> listarPacientes();

    PacienteRespuestaDTO actualizarRespuesta(PacienteActualizarDTO actualizarDTO, Integer id);

}
