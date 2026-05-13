package com.salud.consultorio.controller;

import com.salud.consultorio.dto.usuario.UsuarioCrearDTO;
import com.salud.consultorio.dto.usuario.UsuarioRespuestaDTO;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IUsuarioServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final IUsuarioServicio usuarioServicio;

    @PostMapping
    public ResponseEntity<MensajeResponse> crear(
            @Valid @RequestBody UsuarioCrearDTO dto){

        UsuarioRespuestaDTO respuesta = usuarioServicio.crear(dto);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("USUARIO CREADO CON EXITO")
                .object(respuesta)
                .build(), HttpStatus.CREATED);


    }

}