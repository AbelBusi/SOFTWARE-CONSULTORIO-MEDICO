package com.salud.consultorio.controller;

import com.salud.consultorio.dto.NombreRecepcionistaDTO;
import com.salud.consultorio.dto.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IRecepcionistaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/resumen")
    public ResponseEntity<MensajeResponse> listaNombres() {
        List<NombreRecepcionistaDTO> leerRecepcionistaDTOS = recepcionistaServicio.listaNombres();

        if (leerRecepcionistaDTOS == null) {

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen recepcionistas todavia")
                    .object(null).build(), HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE RECEPCIONISTAS")
                .object(leerRecepcionistaDTOS).build(), HttpStatus.OK);
    }
}