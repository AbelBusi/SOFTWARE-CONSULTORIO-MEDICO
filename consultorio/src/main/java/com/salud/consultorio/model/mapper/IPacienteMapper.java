package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.paciente.PacienteActualizarDTO;
import com.salud.consultorio.dto.paciente.PacienteCrearDTO;
import com.salud.consultorio.model.entity.Paciente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IPacienteMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "persona",ignore = true)
    @Mapping(target = "citaMedicas",ignore = true)
    Paciente pacienteDtoToPaciente (PacienteCrearDTO pacienteCrearDTO);

/*
    @Mapping(target = "persona", source = "persona")
    PacienteRespuestaDTO pacienteToPacienteRespuesta(Paciente paciente);
*/
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "persona",ignore = true)
    void pacienteToPacienteDto(PacienteActualizarDTO actualizarDTO, @MappingTarget Paciente paciente);
}
