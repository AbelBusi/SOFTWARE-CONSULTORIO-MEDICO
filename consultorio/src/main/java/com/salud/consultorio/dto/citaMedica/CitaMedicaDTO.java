package com.salud.consultorio.dto.citaMedica;

import com.salud.consultorio.dto.paciente.PacienteCrearDTO;
import com.salud.consultorio.dto.recepcionista.RecepcionistaRefCitaMedicaDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CitaMedicaDTO {

    private Integer id;

    @Valid
    @NotNull(message = "El recepcionista es obligatorio")
    private RecepcionistaRefCitaMedicaDTO recepcionista;

    @Valid
    @NotNull(message = "El paciente es obligatorio")
    private PacienteCrearDTO paciente;

    @Valid
    @NotNull(message = "El doctor es obligatorio")
    private DoctorRefCitaMedicaDTO doctor;

    @Valid
    @NotNull(message = "La especialidad es obligatoria")
    private EspecialidadRefCitaMedicaDTO especialidad;

    @NotBlank(message = "El motivo es obligatorio")
    @Size(max = 500, message = "El motivo no debe exceder 500 caracteres")
    private String motivo;

    @NotNull(message = "La fecha es obligatoria")
    @FutureOrPresent(message = "La fecha no puede ser pasada")
    private LocalDate fecha;

    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime horaInicio;

    @NotNull(message = "La hora de salida es obligatoria")
    private LocalTime horaSalida;

    @NotNull(message = "El costo es obligatorio")
    @Positive(message = "El costo debe ser mayor a 0")
    private Double costo;

    private Integer estado;

}