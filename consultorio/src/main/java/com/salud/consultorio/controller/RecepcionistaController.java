package com.salud.consultorio.controller;

import com.salud.consultorio.model.dto.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IRecepcionistaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/recepcionistas")
@RequiredArgsConstructor
public class RecepcionistaController {

    private final IRecepcionistaServicio recepcionistaServicio;

    @PostMapping
    public ResponseEntity<MensajeResponse> crearPaciente(@Valid @RequestBody RecepcionistaDTO recepcionistaDTO){

        Recepcionista recepcionista = recepcionistaServicio.crear(recepcionistaDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Recepcionista agregado con exito")
                .object(recepcionistaDTO).build(), HttpStatus.CREATED);

    }

}