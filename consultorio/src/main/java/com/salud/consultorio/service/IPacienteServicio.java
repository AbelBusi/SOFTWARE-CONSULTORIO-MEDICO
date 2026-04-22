package com.salud.consultorio.service;

import com.salud.consultorio.model.dto.NombrePacientesDTO;
import com.salud.consultorio.model.dto.PacienteDTO;
import com.salud.consultorio.model.entity.Paciente;

import java.util.List;

public interface IPacienteServicio extends IBasicoServicio<Paciente, PacienteDTO,Integer>{


    List<NombrePacientesDTO> listarPacientesDtoList();

}
