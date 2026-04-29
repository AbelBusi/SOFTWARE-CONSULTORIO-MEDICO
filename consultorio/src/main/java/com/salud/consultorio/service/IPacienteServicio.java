package com.salud.consultorio.service;

import com.salud.consultorio.dto.paciente.LeerPacienteDTO;
import com.salud.consultorio.dto.NombrePacientesDTO;
import com.salud.consultorio.dto.paciente.PacienteActualizarDTO;
import com.salud.consultorio.dto.paciente.PacienteCrearDTO;
import com.salud.consultorio.dto.paciente.PacienteRespuestaDTO;
import com.salud.consultorio.model.entity.Paciente;

import java.util.List;
import java.util.Optional;

public interface IPacienteServicio{


    List<NombrePacientesDTO> listarPacientesDtoList();

    LeerPacienteDTO traerPacientePorId(Integer id);

    List<LeerPacienteDTO> listarPacientes();

    PacienteRespuestaDTO actualizarRespuesta(PacienteActualizarDTO actualizarDTO, Integer id);

    Optional<Paciente> obtenerPorId(Integer id);

    Boolean existePaciente(Integer id);

    PacienteRespuestaDTO crear(PacienteCrearDTO dto);

    void eliminarPorId(Integer id);

}
