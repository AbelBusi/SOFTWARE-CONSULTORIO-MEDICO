package com.salud.consultorio.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 40, nullable = false, unique = true)
    private String nombre;

    @Column(name = "descripcion", length = 100, nullable = false)
    private String descripcion;

    @Column(name = "estado", nullable = false, columnDefinition = "INT")
    private Integer estado;

    @OneToMany(mappedBy = "rol",fetch = FetchType.LAZY)
    private List<Usuario> usuarios;

}