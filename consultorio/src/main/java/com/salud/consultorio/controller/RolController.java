package com.salud.consultorio.controller;

import com.salud.consultorio.dto.rol.RolRespuestaDTO;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IRolServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/roles")
@RequiredArgsConstructor
public class RolController {

    private final IRolServicio rolServicio;

    @GetMapping
    public ResponseEntity<MensajeResponse> lista(){

        List<RolRespuestaDTO> lista = rolServicio.leerTodos();

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE TODOS LOS ROLES DE LA ENTIDAD")
                .object(lista).build()
                , HttpStatus.OK);

    }

}