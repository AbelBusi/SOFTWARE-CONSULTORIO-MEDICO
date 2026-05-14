package com.salud.consultorio.service;

import com.salud.consultorio.dto.usuario.UsuarioRespuestaDTO;

import java.util.List;

public interface IUsuarioServicio {

    List<UsuarioRespuestaDTO> leerTodos();

    boolean existeUsuario(String usuario);

    boolean existeUsuarioPersona(Integer id);
}