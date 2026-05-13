package com.salud.consultorio.service;

import com.salud.consultorio.dto.usuario.UsuarioCrearDTO;
import com.salud.consultorio.dto.usuario.UsuarioRespuestaDTO;

import java.util.List;

public interface IUsuarioServicio {

    List<UsuarioRespuestaDTO> leerTodos();

    UsuarioRespuestaDTO crear (UsuarioCrearDTO dto);

    boolean existeUsuario(String usuario);

}