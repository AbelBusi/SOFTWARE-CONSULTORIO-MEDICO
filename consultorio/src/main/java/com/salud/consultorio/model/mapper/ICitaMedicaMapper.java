package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.citaMedica.ActualizarCitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.CitaMedicaCrearDTO;
import com.salud.consultorio.dto.citaMedica.CitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.CitaMedicaRespuestaDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ICitaMedicaMapper {


    @Mapping(target = "id",ignore = true)
    CitaMedica citaMedicaDtoToCitaMedica (CitaMedicaDTO citaMedicaDTO);

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "paciente", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "recepcionista", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    CitaMedica citaMedicaCrearDtoToCitaMedica (CitaMedicaCrearDTO dto);

    CitaMedicaDTO citaMedicaToCitaMedicaDto(CitaMedica citaMedica);

    CitaMedicaRespuestaDTO toDto(CitaMedica entidad);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "recepcionista", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    void actualizarCitaDtoToActualizarCita(ActualizarCitaMedicaDTO citaMedica, @MappingTarget CitaMedica entity);

}