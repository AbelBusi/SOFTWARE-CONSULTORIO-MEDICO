package com.salud.consultorio.service;


import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.dto.NombreEspecialidadesDTO;
import com.salud.consultorio.model.entity.Especialidad;

import java.util.List;

public interface IEspecialidadServicio extends IBasicoServicio<Especialidad, EspecialidadDTO,Integer>{

    List<NombreEspecialidadesDTO> listaNombres();

}
