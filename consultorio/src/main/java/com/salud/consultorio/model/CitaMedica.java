package com.salud.consultorio.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "cita_medica")
public class CitaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_recepcionista",nullable = false)
    private Recepcionista recepcionista;

    @ManyToOne
    @JoinColumn(name = "id_paciente",nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_doctor",nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "id_especialidad",nullable = false)
    private Especialidad especialidad;

    @Column(name = "motivo", length = 500, nullable = false, unique = true)
    private String motivo;

    @Column(name = "fecha",nullable = false)
    private LocalDate fecha;

    @Column(name = "hora_inicio",nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_salida",nullable = false)
    private LocalTime horaSalida;

    @Column(name = "costo",precision = 2,nullable = false)
    private Double costo;

    @Column(name = "estado",nullable = false)
    private Integer estado;

}