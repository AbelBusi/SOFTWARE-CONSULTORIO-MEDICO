package com.salud.consultorio.controller;

import com.salud.consultorio.dto.citaMedica.ActualizarCitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.CitaMedicaDTO;
import com.salud.consultorio.dto.citaMedica.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;
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
    public ResponseEntity<MensajeResponse> crearCitaMedicaNuevoPaciente(@Valid @RequestBody CitaMedicaDTO citaMedicaDTO){

        CitaMedica citaMedica =citaMedicaServicio.crear(citaMedicaDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica agregada con exito")
                .object(citaMedicaDTO).build(), HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<MensajeResponse> leerCitaMedica(@PathVariable Integer id){

        CitaMedica citaMedica = citaMedicaServicio.obtenerPorId(id).get();

        if (citaMedica==null){

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("El registro que intenta buscar, no existe")
                    .object(null).build(), HttpStatus.NOT_FOUND);

        }

        CitaMedicaDTO dto= citaMedicaServicio.mostrarCitaMedicaPorId(citaMedica);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica encontrada")
                .object(dto).build(),HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<MensajeResponse> leerCitasMedicas(){

        List<LeerCitaMedicaDTO> leerCitas = citaMedicaServicio.leerCitasMedicas();

        if (leerCitas==null){

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen citas todavia")
                    .object(null).build(),HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE CITAS MEDICAS")
                .object(leerCitas).build(), HttpStatus.OK);


    }

    @PutMapping("/{id}")
    public ResponseEntity<MensajeResponse> actualizarCitaMedica(@PathVariable Integer id, @Valid @RequestBody ActualizarCitaMedicaDTO actualizarCitaMedicaDTO){

        if (!citaMedicaServicio.obtenerPorId(id).isPresent()){

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("La cita que desea actualizar no se encuentra en la entidad.")
                    .object(null).build(), HttpStatus.NOT_FOUND);
        }

        CitaMedica citaMedica = citaMedicaServicio.actualizarCita(actualizarCitaMedicaDTO,id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica actualizada con exito")
                .object(actualizarCitaMedicaDTO).build(), HttpStatus.CREATED);

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