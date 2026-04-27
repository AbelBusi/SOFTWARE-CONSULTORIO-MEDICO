package com.salud.consultorio.controller;

import com.salud.consultorio.model.dto.DoctorDTO;
import com.salud.consultorio.model.dto.NombreDoctoresDTO;
import com.salud.consultorio.model.dto.NombrePacientesDTO;
import com.salud.consultorio.model.entity.Doctor;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IDoctorServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/doctores")
@RequiredArgsConstructor
public class DoctorController {

    private final IDoctorServicio doctorServicio;

    @PostMapping
    public ResponseEntity<MensajeResponse> crearDoctor(@Valid @RequestBody DoctorDTO doctorDTO){

        Doctor doctor =doctorServicio.crear(doctorDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Doctor agregado con exito")
                .object(doctorDTO).build(), HttpStatus.CREATED);

    }

    @GetMapping("/resumen")
    public ResponseEntity<MensajeResponse> listaNombres() {
        List<NombreDoctoresDTO> leerNombreDoctoresDTOS = doctorServicio.listaNombreDoctoresDtos();

        if (leerNombreDoctoresDTOS == null) {

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen doctores todavia")
                    .object(null).build(), HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE DOCTORES")
                .object(leerNombreDoctoresDTOS).build(), HttpStatus.OK);
    }

}