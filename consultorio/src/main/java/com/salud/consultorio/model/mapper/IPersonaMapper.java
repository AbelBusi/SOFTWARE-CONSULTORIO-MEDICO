package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.PersonaCrearDTO;
import com.salud.consultorio.model.entity.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IPersonaMapper {


    @Mapping(target = "id",ignore = true)
    Persona personaDtoToPersona (PersonaCrearDTO personaCrearDTO);

    @Mapping(target = "id", ignore = true)
    void personaToPersonaDto(PersonaCrearDTO personaCrearDTO, @MappingTarget Persona persona);

}