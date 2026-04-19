package com.salud.consultorio.controller;

import com.salud.consultorio.impl.EspecialidadServicioImpl;
import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.payload.MensajeResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/especialidades")
@RequiredArgsConstructor
public class EspcialidadController {

    private final EspecialidadServicioImpl especialidadServicio;

    @PostMapping
    public ResponseEntity<?> crearEspecialidad(@Valid @RequestBody EspecialidadDTO especialidadDTO){

        Especialidad especialidad =especialidadServicio.crear(especialidadDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Especialidad agregada con exito")
                .object(especialidadDTO).build(), HttpStatus.CREATED);

    }

}