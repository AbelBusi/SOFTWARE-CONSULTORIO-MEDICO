package com.salud.consultorio.controller;

import com.salud.consultorio.dto.paciente.*;
import com.salud.consultorio.dto.paciente.NombrePacientesDTO;
import com.salud.consultorio.model.enums.PacienteEstado;
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
    public ResponseEntity<MensajeResponse> crearPaciente(@Valid @RequestBody PacienteCrearDTO pacienteCrearDTO){

        PacienteRespuestaDTO paciente = pacienteServicio.crear(pacienteCrearDTO);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Paciente agregado con exito")
                .object(paciente).build(), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<MensajeResponse> listarPacientes(
            @RequestParam(name = "estado",required = false) PacienteEstado pacienteEstado) {

        if (pacienteEstado!=null) {

            if (pacienteEstado.equals(pacienteEstado.ACTIVO)) {

                List<PacienteActivoLeerDTO> pacientes = pacienteServicio.listarPacientesActivos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE PACIENTES ACTIVOS")
                        .object(pacientes).build(), HttpStatus.OK);
            }

            if (pacienteEstado.equals(pacienteEstado.INACTIVO)) {

                List<PacienteActivoLeerDTO> pacientes = pacienteServicio.listarPacientesInativos();
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje("LISTA DE PACIENTES INACTIVOS")
                        .object(pacientes).build(), HttpStatus.OK);
            }

        }

        List<PacienteLeerDTO> leerPacientes = pacienteServicio.listarPacientes();

        if (leerPacientes == null) {

            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("No existen pacientes todavia")
                    .object(null).build(), HttpStatus.NO_CONTENT);

        }

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("LISTA DE PACIENTES")
                .object(leerPacientes).build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MensajeResponse> leerPacientePorID(@PathVariable Integer id){

        PacienteLeerDTO dto = pacienteServicio.traerPacientePorId(id);
        if (dto==null){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("El paciente no existe")
                    .object(null).build(),HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("PACIENTE ENCONTRADO")
                .object(dto).build(),HttpStatus.OK);

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

    @PutMapping("/{id}")
    public ResponseEntity<MensajeResponse> actualizarCitaMedica(@PathVariable Integer id, @Valid @RequestBody PacienteActualizarDTO actualizarDTO){

        PacienteRespuestaDTO paciente = pacienteServicio.actualizarRespuesta(actualizarDTO,id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Cita Medica actualizada con exito")
                .object(paciente).build(), HttpStatus.CREATED);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensajeResponse> eliminarPaciente(@PathVariable Integer id){

        pacienteServicio.eliminarPorId(id);

        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Paciente eliminado con exito")
                .object(null).build(),HttpStatus.NO_CONTENT);

    }


}