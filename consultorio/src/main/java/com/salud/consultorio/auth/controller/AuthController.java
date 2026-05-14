package com.salud.consultorio.auth.controller;

import com.salud.consultorio.auth.dto.TokenResponse;
import com.salud.consultorio.auth.dto.UsuarioCrearDTO;
import com.salud.consultorio.auth.service.IAuthServicio;
import com.salud.consultorio.model.payload.MensajeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthServicio authServicio;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> registrar(
            @RequestBody UsuarioCrearDTO dto
            ){

        final TokenResponse token = authServicio.registrar(dto);

        return ResponseEntity.ok(token);

    }

}