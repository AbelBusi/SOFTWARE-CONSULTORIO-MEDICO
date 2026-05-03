package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.recepcionista.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IRecepnionistaMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "citas",ignore = true)
    Recepcionista recepcionistaDtoToRecepcionista(RecepcionistaDTO recepcionistaDTO);

}