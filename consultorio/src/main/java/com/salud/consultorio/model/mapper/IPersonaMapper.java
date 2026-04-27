package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.PersonaCrearDTO;
import com.salud.consultorio.model.entity.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IPersonaMapper {


    @Mapping(target = "id",ignore = true)
    @Mapping(target = "recepcionista", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    Persona personaDtoToPersona (PersonaCrearDTO personaCrearDTO);


    void personaToPersonaDto(PersonaCrearDTO personaCrearDTO, @MappingTarget Persona persona);

}