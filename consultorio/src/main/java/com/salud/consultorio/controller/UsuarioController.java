package com.salud.consultorio.controller;

import com.salud.consultorio.service.IUsuarioServicio;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/usuarios")
@RequiredArgsConstructor
@Tag(
        name = "Usuarios",
        description = "Endpoints para la gestión de usuarios del sistema"
)
public class UsuarioController {

    private final IUsuarioServicio usuarioServicio;

}