package com.salud.consultorio.service;

import com.salud.consultorio.dto.NombreRecepcionistaDTO;
import com.salud.consultorio.dto.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;

import java.util.List;

public interface IRecepcionistaServicio extends IBasicoServicio<Recepcionista, RecepcionistaDTO, Integer>{

    List<NombreRecepcionistaDTO> listaNombres();

}