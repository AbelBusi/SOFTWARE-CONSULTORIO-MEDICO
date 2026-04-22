package com.salud.consultorio.service;

import com.salud.consultorio.model.dto.ActualizarCitaMedicaDTO;
import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.dto.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;

import java.util.List;

public interface ICitaMedicaServicio extends IBasicoServicio<CitaMedica, CitaMedicaDTO, Integer>{

    CitaMedicaDTO mostrarCitaMedicaPorId(CitaMedica citaMedica);

    List<LeerCitaMedicaDTO> leerCitasMedicas();

    CitaMedica actualizarCita(ActualizarCitaMedicaDTO actualizarCitaMedicaDTO, Integer id);


}
