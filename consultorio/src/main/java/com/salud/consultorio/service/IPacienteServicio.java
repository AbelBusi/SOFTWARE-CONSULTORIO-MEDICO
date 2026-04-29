package com.salud.consultorio.service;

import com.salud.consultorio.dto.paciente.LeerPacienteDTO;
import com.salud.consultorio.dto.NombrePacientesDTO;
import com.salud.consultorio.dto.paciente.PacienteActualizarDTO;
import com.salud.consultorio.dto.paciente.PacienteCrearDTO;
import com.salud.consultorio.dto.paciente.PacienteRespuestaDTO;
import com.salud.consultorio.model.entity.Paciente;

import java.util.List;

public interface IPacienteServicio extends IBasicoServicio<Paciente, PacienteCrearDTO,Integer>{


    List<NombrePacientesDTO> listarPacientesDtoList();

    LeerPacienteDTO traerPaciente(Integer id);

    List<LeerPacienteDTO> listarPacientes();

    PacienteRespuestaDTO actualizarRespuesta(PacienteActualizarDTO actualizarDTO, Integer id);

}
