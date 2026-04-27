package com.salud.consultorio.model.dto;

import lombok.*;

import java.sql.Date;
import java.sql.Time;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
public class LeerCitaMedicaDTO {
    private Integer id;
    private String nombrePaciente;
    private String apellidosPaciente;
    private String motivoConsulta;
    private String especialidad;
    private Date diaConsulta;
    private Time horaInicio;
    private Time horaSalida;
    private String nombreDoctor;
    private Integer estado;

}