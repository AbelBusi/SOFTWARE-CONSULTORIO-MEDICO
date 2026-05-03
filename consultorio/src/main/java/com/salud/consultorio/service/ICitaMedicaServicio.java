package com.salud.consultorio.service;

import com.salud.consultorio.dto.citaMedica.ActualizarCitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.CitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;

import java.util.List;
import java.util.Optional;

public interface ICitaMedicaServicio{

    CitaMedicaDTO mostrarCitaMedicaPorId(CitaMedica citaMedica);

    List<LeerCitaMedicaDTO> leerCitasMedicas();

    CitaMedica actualizarCita(ActualizarCitaMedicaDTO actualizarCitaMedicaDTO, Integer id);

    List<CitaMedica> listarTodos();

    Optional<CitaMedica> obtenerPorId(Integer id);

    CitaMedica crear(CitaMedicaDTO dto);

    CitaMedica actualizar(CitaMedicaDTO dto, Integer id);

    void eliminarPorId(Integer id);
}
