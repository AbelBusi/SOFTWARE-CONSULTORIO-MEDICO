package com.salud.consultorio.controller;

import com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO;
import com.salud.consultorio.dto.recepcionista.*;
import com.salud.consultorio.model.entity.Recepcionista;
import com.salud.consultorio.model.enums.EntidadEstado;
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
    public ResponseEntity<MensajeResponse> crear(@Valid @RequestBody RecepcionistaCrearDTO recepcionistaCrearDTO){

        RecepcionistaRespuestaDTO recepcionista = recepcionistaServicio.crear(recepcionistaCrearDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Recepcionista agregado con exito")
                .object(recepcionista).build(), HttpStatus.CREATED);

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

    @PutMapping("/{id}")
    public ResponseEntity<MensajeResponse> actualizar(@PathVariable Integer id,@Valid @RequestBody RecepcionistaActualizarDTO dto){

        RecepcionistaRespuestaDTO actualizar = recepcionistaServicio.actualizar(dto,id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("EL RECEPCIONISTA FUE ACTUALIZADO CON EXITO")
                .object(actualizar).build(),HttpStatus.OK);



    }

    @GetMapping
    public ResponseEntity<MensajeResponse> leerRecepcionistas(
            @RequestParam(required = false,name = "estado") EntidadEstado estado){

        if (estado!=null){

            if (estado.equals(estado.ACTIVO)){
                List<RecepcionistaLeerDTO> recepcionistas =recepcionistaServicio.listarRecepcionistasActivos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE RECEPCIONISTAS POR ESTADO ACTIVO")
                        .object(recepcionistas).build(),HttpStatus.OK);
            }

            if (estado.equals(estado.INACTIVO)){
                List<RecepcionistaLeerDTO> recepcionistas =recepcionistaServicio.listarRecepcionistasInactivos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE RECEPCIONISTAS POR ESTADO INACTIVO")
                        .object(recepcionistas).build(),HttpStatus.OK);
            }

        }
        List<RecepcionistaLeerDTO> recepcionistas =recepcionistaServicio.listarRecepcionistasPersonas();

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE RECEPCIONISTAS")
                .object(recepcionistas).build(),HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<MensajeResponse> leerRecepcionistaPorId(@PathVariable Integer id){

        RecepcionistaLeerDTO leer = recepcionistaServicio.leerPorId(id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Informacion del recepcionista solicitado")
                .object(leer).build(),HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensajeResponse> eliminarRecepcionistaPorId(@PathVariable Integer id){

        recepcionistaServicio.eliminarPorId(id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Recepcionista eliminado con exito")
                .object(null).build(),HttpStatus.NO_CONTENT);

    }
}