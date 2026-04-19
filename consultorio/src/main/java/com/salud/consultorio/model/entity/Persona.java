package com.salud.consultorio.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "persona")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "dni", length = 8, nullable = false, unique = true)
    private String dni;

    @Column(name = "nombre", length = 70, nullable = false)
    private String nombre;

    @Column(name = "apellidos", length = 100, nullable = false)
    private String apellidos;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "genero", length = 20, nullable = false)
    private String genero;

    @Column(name = "telefono", length = 9, nullable = true)
    private String telefono;

    @Column(name = "nacionalidad", length = 50, nullable = false)
    private String nacionalidad;

    @Column(name = "correo", length = 100, nullable = true, unique = true)
    private String correo;

    @Column(name = "estado", nullable = false)
    private Integer estado;

    @OneToOne(mappedBy = "persona",fetch = FetchType.LAZY)
    private Recepcionista recepcionista;

    @OneToOne(mappedBy = "persona",fetch = FetchType.LAZY)
    private Paciente paciente;

    @OneToOne(mappedBy = "persona",fetch = FetchType.LAZY)
    private Doctor doctor;

}