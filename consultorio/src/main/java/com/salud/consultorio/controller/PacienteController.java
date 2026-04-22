package com.salud.consultorio.controller;

import com.salud.consultorio.model.dto.NombrePacientesDTO;
import com.salud.consultorio.model.dto.NombreRecepcionistaDTO;
import com.salud.consultorio.model.dto.PacienteDTO;
import com.salud.consultorio.model.entity.Paciente;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IPacienteServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final IPacienteServicio pacienteServicio;

    @PostMapping
    public ResponseEntity<MensajeResponse> crearPaciente(@Valid @RequestBody PacienteDTO pacienteDTO){

        Paciente paciente = pacienteServicio.crear(pacienteDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Paciente agregado con exito")
                .object(pacienteDTO).build(), HttpStatus.CREATED);

    }

    @GetMapping("/resumen")
    public ResponseEntity<MensajeResponse> listaNombres() {
        List<NombrePacientesDTO> leerNombrePacientesDTOS = pacienteServicio.listarPacientesDtoList();

        if (leerNombrePacientesDTOS == null) {

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen pacientes todavia")
                    .object(null).build(), HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE PACIENTES")
                .object(leerNombrePacientesDTOS).build(), HttpStatus.OK);
    }

}