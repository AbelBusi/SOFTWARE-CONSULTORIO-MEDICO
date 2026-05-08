package com.salud.consultorio.dto.citaMedica;

import lombok.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
@Setter
public class CitaMedicaLeerDTO {

    private Integer id;
    private String nombrePaciente;
    private String apellidosPaciente;
    private String motivoConsulta;
    private String especialidad;
    private LocalDate diaConsulta;
    private LocalTime horaInicio;
    private LocalTime horaSalida;
    private String nombreDoctor;
    private Integer estado;

    public CitaMedicaLeerDTO(Integer id, String nombrePaciente, String apellidosPaciente, String motivoConsulta, String especialidad, LocalDate diaConsulta, LocalTime horaInicio, LocalTime horaSalida, String nombreDoctor, Integer estado) {
        this.id = id;
        this.nombrePaciente = nombrePaciente;
        this.apellidosPaciente = apellidosPaciente;
        this.motivoConsulta = motivoConsulta;
        this.especialidad = especialidad;
        this.diaConsulta = diaConsulta;
        this.horaInicio = horaInicio;
        this.horaSalida = horaSalida;
        this.nombreDoctor = nombreDoctor;
        this.estado = estado;
    }
}