package com.salud.consultorio.model.mapper;

import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.dto.DoctorDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import com.salud.consultorio.model.entity.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ICitaMedicaMapper {


    @Mapping(target = "id",ignore = true)
    CitaMedica citaMedicaDtoToCitaMedica (CitaMedicaDTO citaMedicaDTO);

}