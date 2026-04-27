package com.salud.consultorio.model.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class LeerPacienteDTO {

    private Integer id;
    private String dni;
    private String nombre;
    private String apellidos;
    private LocalDate fechaNacimiento;
    private String genero;
    private String telefono;
    private String nacionalidad;
    private String correo;
    private String entidadAseguradora;
    private String codigoAseguradora;
    private Integer estado;

    public LeerPacienteDTO(Integer id, String dni, String nombre, String apellidos, LocalDate fechaNacimiento, String genero, String telefono, String nacionalidad, String correo, String entidadAseguradora, String codigoAseguradora, Integer estado) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.telefono = telefono;
        this.nacionalidad = nacionalidad;
        this.correo = correo;
        this.entidadAseguradora = entidadAseguradora;
        this.codigoAseguradora = codigoAseguradora;
        this.estado = estado;
    }
}