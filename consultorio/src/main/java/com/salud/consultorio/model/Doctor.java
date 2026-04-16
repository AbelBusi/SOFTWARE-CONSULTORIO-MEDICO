package com.salud.consultorio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_persona",nullable = false)
    private Persona persona;

    @ManyToOneg
    @JoinColumn(name = "id_especialidad",nullable = false)
    private Especialidad especialidad;

    @Column(name = "cpm", length = 20, nullable = false)
    private String cpm;

    @Column(name = "telefono", length = 20, nullable = true)
    private String rne;

    @Column(name = "consejo_regional", length = 50, nullable = false)
    private String consejoRegional;

    @Column(name = "foto", length = 100, nullable = false)
    private String foto;

    @Column(name = "estado", nullable = false)
    private Integer estado;

}
