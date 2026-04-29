package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.DoctorDTO;
import com.salud.consultorio.model.entity.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IDoctorMapper {


    @Mapping(target = "id",ignore = true)
    @Mapping(target = "horarios",ignore = true)
    @Mapping(target = "citaMedicas",ignore = true)
    @Mapping(target = "especialidad",ignore = true)
    Doctor doctordDtoToDoctor (DoctorDTO doctorDTO);

}