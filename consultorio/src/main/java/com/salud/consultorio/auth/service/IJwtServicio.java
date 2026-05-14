package com.salud.consultorio.auth.service;

import com.salud.consultorio.model.entity.Usuario;

public interface IJwtServicio {

    String generarToken(Usuario usuario);

    String generarTokenRefrescado(Usuario usuario);

    String construirToken(Usuario usuario, Integer expiration);

}