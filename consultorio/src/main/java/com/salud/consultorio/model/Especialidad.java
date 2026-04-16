package com.salud.consultorio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "especialidad")
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 40, nullable = false, unique = true)
    private String nombre;

    @Column(name = "descripcion", length = 100, nullable = false)
    private String descripcion;

    @Column(name = "estado",nullable = false)
    private Integer estado;

    @OneToMany(mappedBy = "especialidad",fetch = FetchType.LAZY)
    private List<Doctor> doctores;

}