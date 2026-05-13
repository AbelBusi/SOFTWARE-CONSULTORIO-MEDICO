package com.salud.consultorio.controller;

import com.salud.consultorio.dto.citaMedica.*;
import com.salud.consultorio.model.enums.EntidadEstado;
import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.ICitaMedicaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/citas-medicas")
@RequiredArgsConstructor
public class CitaMedicaController {

    private final ICitaMedicaServicio citaMedicaServicio;

    @PostMapping
    public ResponseEntity<MensajeResponse> crear(@Valid @RequestBody CitaMedicaCrearDTO dto){

        CitaMedicaRespuestaDTO citaMedica =citaMedicaServicio.crearCita(dto);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica agregada con exito")
                .object(citaMedica).build(), HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<MensajeResponse> leerCitaMedica(@PathVariable Integer id){

        CitaMedicaLeerDTO dto= citaMedicaServicio.mostrarCitaMedicaPorId(id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica encontrada")
                .object(dto).build(),HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<MensajeResponse> leerCitas(
            @RequestParam(required = false,name = "estado") EntidadEstado estado){

        if (estado!=null){

            if (estado.equals(estado.ACTIVO)){
                List<CitaMedicaLeerDTO> doctores =citaMedicaServicio.leerCitasMedicasActivas();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE CITAS MEDICAS POR ESTADO ACTIVO")
                        .object(doctores).build(),HttpStatus.OK);
            }

            if (estado.equals(estado.INACTIVO)){
                List<CitaMedicaLeerDTO> doctores =citaMedicaServicio.leerCitasMedicasInactivas();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE CITAS MEDICAS POR ESTADO INACTIVO")
                        .object(doctores).build(),HttpStatus.OK);
            }

        }
        List<CitaMedicaLeerDTO> doctores =citaMedicaServicio.leerCitasMedicas();

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE CITAS MEDICAS")
                .object(doctores).build(),HttpStatus.OK);

    }


    @PutMapping("/{id}")
    public ResponseEntity<MensajeResponse> actualizarCitaMedica(@PathVariable Integer id, @Valid @RequestBody CitaMedicaActualizarDTO citaMedicaActualizarDTO){

        CitaMedicaActualizarRespuestaDTO citaMedica = citaMedicaServicio.actualizar(citaMedicaActualizarDTO,id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica actualizada con exito")
                .object(citaMedica).build(), HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensajeResponse> eliminarCitaMedica(@PathVariable Integer id){

        if (!citaMedicaServicio.obtenerPorId(id).isPresent()){

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("La cita medica no se puede eliminar porque no existe")
                    .object(null).build(),HttpStatus.NOT_FOUND);
        }

        citaMedicaServicio.eliminarPorId(id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("La cita medica se elimino con exito")
                .object(null).build(),HttpStatus.NO_CONTENT);
    }



}