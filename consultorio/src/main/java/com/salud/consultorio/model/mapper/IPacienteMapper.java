package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.dto.PacienteDTO;
import com.salud.consultorio.model.dto.PersonaDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Paciente;
import com.salud.consultorio.model.entity.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IPacienteMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "persona",ignore = true)
    @Mapping(target = "citaMedicas",ignore = true)
    Paciente pacienteDtoToPaciente (PacienteDTO pacienteDTO);

}