package com.salud.consultorio.controller;

import com.salud.consultorio.dto.doctor.DoctorCrearDTO;
import com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO;
import com.salud.consultorio.dto.doctor.DoctorRespuestaDTO;
import com.salud.consultorio.dto.doctor.NombreDoctoresDTO;
import com.salud.consultorio.model.entity.Doctor;
import com.salud.consultorio.model.enums.DoctorEstado;
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
    public ResponseEntity<MensajeResponse> crearDoctor(@Valid @RequestBody DoctorCrearDTO doctorCrearDTO){

        DoctorRespuestaDTO doctor =doctorServicio.crearDoctor(doctorCrearDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Doctor agregado con exito")
                .object(doctorCrearDTO).build(), HttpStatus.CREATED);

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

    @GetMapping
    public ResponseEntity<MensajeResponse> leerDoctores(
            @RequestParam(required = false,name = "estado")DoctorEstado estado){

        if (estado!=null){

            if (estado.equals(estado.ACTIVO)){
                List<DoctorEspecialidadLeerDTO> doctores =doctorServicio.todosDoctoresEspecialidadActivos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE DOCTORES POR ESTADO ACTIVO")
                        .object(doctores).build(),HttpStatus.OK);
            }

            if (estado.equals(estado.INACTIVO)){
                List<DoctorEspecialidadLeerDTO> doctores =doctorServicio.todosDoctoresEspecialidadInactivos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE DOCTORES POR ESTADO INACTIVO")
                        .object(doctores).build(),HttpStatus.OK);
            }

        }
        List<DoctorEspecialidadLeerDTO> doctores =doctorServicio.todosDoctoresEspecialidad();

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE DOCTORES")
                .object(doctores).build(),HttpStatus.OK);

    }



}