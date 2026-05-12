package com.salud.consultorio.service;

import com.salud.consultorio.dto.citaMedica.*;
import com.salud.consultorio.model.entity.CitaMedica;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ICitaMedicaServicio{

    CitaMedicaLeerDTO mostrarCitaMedicaPorId(Integer id);

    List<CitaMedicaLeerDTO> leerCitasMedicas();

    List<CitaMedicaLeerDTO> leerCitasMedicasActivas();

    List<CitaMedicaLeerDTO> leerCitasMedicasInactivas();

    CitaMedicaActualizarRespuestaDTO actualizar(CitaMedicaActualizarDTO citaMedicaActualizarDTO, Integer id);

    List<CitaMedica> listarTodos();

    CitaMedicaRespuestaDTO crearCita(CitaMedicaCrearDTO dto);

    Optional<CitaMedica> obtenerPorId(Integer id);

    boolean cruceHorarios(LocalDate fecha, LocalTime horaSalida, LocalTime horaEntrada);

    CitaMedica crear(CitaMedicaDTO dto);

    void eliminarPorId(Integer id);
}
