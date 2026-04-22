package com.salud.consultorio.controller;

import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.dto.NombreDoctoresDTO;
import com.salud.consultorio.model.dto.NombreEspecialidadesDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IEspecialidadServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/especialidades")
@RequiredArgsConstructor
public class EspcialidadController {

    private final IEspecialidadServicio especialidadServicio;

    @PostMapping
    public ResponseEntity<?> crearEspecialidad(@Valid @RequestBody EspecialidadDTO especialidadDTO){

        Especialidad especialidad =especialidadServicio.crear(especialidadDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Especialidad agregada con exito")
                .object(especialidadDTO).build(), HttpStatus.CREATED);

    }

    @GetMapping("/resumen")
    public ResponseEntity<MensajeResponse> listaNombres() {
        List<NombreEspecialidadesDTO> leerNombreEspecialidadesDTOS = especialidadServicio.listaNombres();

        if (leerNombreEspecialidadesDTOS == null) {

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen especialidades todavia")
                    .object(null).build(), HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE ESPECIALIDADES")
                .object(leerNombreEspecialidadesDTOS).build(), HttpStatus.OK);
    }

}