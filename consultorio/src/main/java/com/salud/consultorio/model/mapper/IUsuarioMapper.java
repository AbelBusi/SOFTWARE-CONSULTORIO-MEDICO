package com.salud.consultorio.model.mapper;

import com.salud.consultorio.dto.rol.RolRespuestaDTO;
import com.salud.consultorio.dto.usuario.UsuarioActualizarDTO;
import com.salud.consultorio.dto.usuario.UsuarioCrearDTO;
import com.salud.consultorio.dto.usuario.UsuarioRespuestaDTO;
import com.salud.consultorio.model.entity.Rol;
import com.salud.consultorio.model.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IUsuarioMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "persona", ignore = true)
    @Mapping(target = "rol",ignore = true)
    @Mapping(target = "claveAcceso",ignore = true)
    Usuario toEntity(UsuarioCrearDTO dto);

    UsuarioRespuestaDTO toDto(Usuario usuario);

    void updateFromDto(UsuarioActualizarDTO dto, @MappingTarget Usuario usuario);
}