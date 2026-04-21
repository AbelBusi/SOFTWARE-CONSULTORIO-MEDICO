package com.salud.consultorio.service;

import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.dto.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;

import java.util.List;
import java.util.Optional;

public interface ICitaMedicaServicio extends IBasicoServicio<CitaMedica, CitaMedicaDTO, Integer>{

    CitaMedicaDTO mostrarCitaMedicaPorId(CitaMedica citaMedica);

    List<LeerCitaMedicaDTO> leerCitasMedicas();



}
