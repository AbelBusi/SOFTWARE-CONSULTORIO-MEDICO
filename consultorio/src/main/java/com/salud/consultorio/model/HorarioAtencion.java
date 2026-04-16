package com.salud.consultorio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "horario_atencion")
public class HorarioAtencion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_doctor", nullable = false)
    private Doctor doctor;

    @Column(name = "dia_semana",nullable = false)
    private Integer diaSemana;

    @Column(name = "hora_entrada",nullable = false)
    private LocalTime horaEntrada;

    @Column(name = "hora_salida",nullable = false)
    private LocalTime horaSalida;

    @Column(name = "estado", nullable = false)
    private Integer estado;

}