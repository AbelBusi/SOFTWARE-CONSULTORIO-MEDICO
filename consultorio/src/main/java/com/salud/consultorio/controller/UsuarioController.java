package com.salud.consultorio.controller;

import com.salud.consultorio.service.IUsuarioServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final IUsuarioServicio usuarioServicio;

}