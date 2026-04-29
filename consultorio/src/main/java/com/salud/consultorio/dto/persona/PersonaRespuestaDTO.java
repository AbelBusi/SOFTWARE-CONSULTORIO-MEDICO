package com.salud.consultorio.dto.persona;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonaRespuestaDTO {

    private Integer id;

    private String dni;

    private String nombre;

    private String apellidos;

    private LocalDate fechaNacimiento;

    private String genero;

    private String telefono;

    private String nacionalidad;

    private String correo;

    private Integer estado;
}