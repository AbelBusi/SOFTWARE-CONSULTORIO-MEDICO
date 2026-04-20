package com.salud.consultorio.model.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonaDTO {

    private Integer id;

    @NotBlank(message = "El DNI es obligatorio")
    @Size(min = 8, max = 8, message = "El DNI debe tener 8 dígitos")
    @Pattern(regexp = "\\d{8}", message = "El DNI solo debe contener números")
    private String dni;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 70, message = "El nombre no debe exceder 70 caracteres")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 100, message = "Los apellidos no deben exceder 100 caracteres")
    private String apellidos;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 20, message = "El género no debe exceder 20 caracteres")
    private String genero;

    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @NotBlank(message = "La nacionalidad es obligatoria")
    @Size(max = 50, message = "La nacionalidad no debe exceder 50 caracteres")
    private String nacionalidad;

    @Email(message = "El correo debe tener un formato válido")
    @Size(max = 100, message = "El correo no debe exceder 100 caracteres")
    private String correo;

    private Integer estado;
}