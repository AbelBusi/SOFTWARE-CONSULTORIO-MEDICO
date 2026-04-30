package com.salud.consultorio.service;

import com.salud.consultorio.dto.paciente.*;
import com.salud.consultorio.dto.NombrePacientesDTO;
import com.salud.consultorio.model.entity.Paciente;

import java.util.List;
import java.util.Optional;

public interface IPacienteServicio{


    List<NombrePacientesDTO> listarPacientesDtoList();

    PacienteLeerDTO traerPacientePorId(Integer id);

    List<PacienteLeerDTO> listarPacientes();

    PacienteRespuestaDTO actualizarRespuesta(PacienteActualizarDTO actualizarDTO, Integer id);

    Optional<Paciente> obtenerPorId(Integer id);

    Boolean existePaciente(Integer id);

    PacienteRespuestaDTO crear(PacienteCrearDTO dto);

    void eliminarPorId(Integer id);

    List<PacienteActivoLeerDTO> listarPacientesActivos();

    List<PacienteActivoLeerDTO> listarPacientesInativos();

}
