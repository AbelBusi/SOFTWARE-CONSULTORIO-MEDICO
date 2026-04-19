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
@Table(name = "recepcionista")
public class Recepcionista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_persona",nullable = false,unique = true)
    private Persona persona;

    @Column(name = "codigo_empleado", length = 25, nullable = false, unique = true)
    private String codigoEmpleado;

    @Column(name = "estado",nullable = false)
    private Integer estado;

    @OneToMany(mappedBy = "recepcionista",fetch = FetchType.LAZY)
    private List<CitaMedica> citas;

}