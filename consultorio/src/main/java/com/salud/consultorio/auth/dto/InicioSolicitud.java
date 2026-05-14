package com.salud.consultorio.auth.dto;

public record InicioSolicitud(
        String email,
        String password
) {
}