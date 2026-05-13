package com.salud.consultorio.model.entity;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = {CascadeType.PERSIST},fetch = FetchType.LAZY)
    @JoinColumn(name = "id_persona",nullable = false)
    private Persona persona;

    @ManyToOne(cascade = {CascadeType.PERSIST},fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rol",nullable = false)
    private Rol rol;

    @Column(name = "usuario",nullable = false)
    private String usuario;

    @Column(name = "clave_acceso",nullable = false)
    private String claveAcceso;

    @Column(name = "estado",nullable = false)
    private Integer estado;

}