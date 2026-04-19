package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.entity.Especialidad;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IEspecialidadMapper {


    @Mapping(target = "id",ignore = true)
    Especialidad especialidadDtoToEspecialidad (EspecialidadDTO especialidadDTO);

}