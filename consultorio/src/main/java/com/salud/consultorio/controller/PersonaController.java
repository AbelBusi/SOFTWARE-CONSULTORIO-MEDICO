package com.salud.consultorio.controller;

import com.salud.consultorio.impl.EspecialidadServicioImpl;
import com.salud.consultorio.impl.PersonaServicioImpl;
import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.dto.PersonaDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IPersonaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/personas")
@RequiredArgsConstructor
public class PersonaController {

    private final IPersonaServicio personaServicio;

    @PostMapping
    public ResponseEntity<?> crearPersona(@Valid @RequestBody PersonaDTO personaDTO){

        Persona persona =personaServicio.crear(personaDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Persona agregada con exito")
                .object(personaDTO).build(), HttpStatus.CREATED);

    }

}