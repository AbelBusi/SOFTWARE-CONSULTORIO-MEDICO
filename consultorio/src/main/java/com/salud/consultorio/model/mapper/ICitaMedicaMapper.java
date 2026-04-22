package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.ActualizarCitaMedicaDTO;
import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.dto.DoctorDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import com.salud.consultorio.model.entity.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ICitaMedicaMapper {


    @Mapping(target = "id",ignore = true)
    CitaMedica citaMedicaDtoToCitaMedica (CitaMedicaDTO citaMedicaDTO);

    CitaMedicaDTO citaMedicaToCitaMedicaDto(CitaMedica citaMedica);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "recepcionista", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    void actualizarCitaDtoToActualizarCita(ActualizarCitaMedicaDTO citaMedica, @MappingTarget CitaMedica entity);

}