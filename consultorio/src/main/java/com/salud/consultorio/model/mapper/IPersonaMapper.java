package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.dto.PersonaDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IPersonaMapper {

    @Mapping(target = "id",ignore = true)
    Persona personaDtoToPersona (PersonaDTO personaDTO);

}