package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.doctor.EspecialidadRefDoctorDTO;
import com.salud.consultorio.dto.especialidad.EspecialidadDTO;
import com.salud.consultorio.model.entity.Especialidad;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IEspecialidadMapper {


    @Mapping(target = "id",ignore = true)
    @Mapping(target = "doctores",ignore = true)
    @Mapping(target = "citaMedicas",ignore = true)
    Especialidad especialidadDtoToEspecialidad (EspecialidadDTO especialidadDTO);

    Especialidad especialidadRefDtoToEspecialidad(EspecialidadRefDoctorDTO especialidadRefDoctorDTO);



}