package com.salud.consultorio.controller;

import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.ICitaMedicaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/citas-medicas")
@RequiredArgsConstructor
public class CitaMedicaController {

    private final ICitaMedicaServicio citaMedicaServicio;

    @PostMapping
    public ResponseEntity<?> crearCitaMedicaNuevoPaciente(@Valid @RequestBody CitaMedicaDTO citaMedicaDTO){

        CitaMedica citaMedica =citaMedicaServicio.crear(citaMedicaDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica agregada con exito")
                .object(citaMedicaDTO).build(), HttpStatus.CREATED);

    }

}