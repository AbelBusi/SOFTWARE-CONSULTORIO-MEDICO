package com.salud.consultorio.auth.service;

import com.salud.consultorio.model.entity.Usuario;

public interface IJwtServicio {

    String extraerUsuario(String token);

    String generarToken(Usuario usuario);

    String generarTokenRefrescado(Usuario usuario);

    String construirToken(Usuario usuario, Integer expiration);

    boolean tokenValido(final String token, Usuario usuario);

    boolean tokenExpirado(String token);

}