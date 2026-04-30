package com.salud.consultorio.dto.paciente;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class PacienteActivoLeerDTO {

    private Integer id;
    private String dni;
    private String nombre;
    private String apellidos;
    private String genero;
    private String entidadAseguradora;
    private Integer estado;

    public PacienteActivoLeerDTO(Integer id, String dni, String nombre, String apellidos, String genero, String entidadAseguradora, Integer estado) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.genero = genero;
        this.entidadAseguradora = entidadAseguradora;
        this.estado = estado;
    }
}