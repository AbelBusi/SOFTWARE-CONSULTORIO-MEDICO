package com.salud.consultorio.dto.persona;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class PersonaLeerDTO {

    private Integer id;

    private String dni;

    private String nombre;

    private String apellidos;

    private LocalDate fechaNacimiento;

    private String genero;

    private String telefono;

    private String nacionalidad;

    private String correo;

    public PersonaLeerDTO(Integer id, String dni, String nombre, String apellidos, LocalDate fechaNacimiento, String genero, String telefono, String nacionalidad, String correo) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.telefono = telefono;
        this.nacionalidad = nacionalidad;
        this.correo = correo;
    }
}