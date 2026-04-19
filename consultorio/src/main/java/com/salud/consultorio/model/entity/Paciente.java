package com.salud.consultorio.model.entity;

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
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_persona",nullable = false,unique = true)
    private Persona persona;

    @Column(name = "entidad_aseguradora", length = 8, nullable = false, unique = true)
    private String entidadAseguradora;

    @Column(name = "codigo_aseguradora", length = 20, nullable = false)
    private String codigoAseguradora;

    @Column(name = "estado",nullable = false)
    private Integer estado;

    @OneToMany(mappedBy = "paciente",fetch = FetchType.LAZY)
    private List<CitaMedica> citaMedicas;

}