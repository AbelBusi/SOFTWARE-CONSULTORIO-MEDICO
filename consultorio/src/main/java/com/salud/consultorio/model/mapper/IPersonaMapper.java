package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.PersonaDTO;
import com.salud.consultorio.model.entity.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IPersonaMapper {


    @Mapping(target = "id",ignore = true)
    @Mapping(target = "recepcionista", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    Persona personaDtoToPersona (PersonaDTO personaDTO);

}