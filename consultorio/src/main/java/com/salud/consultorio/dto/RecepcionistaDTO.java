package com.salud.consultorio.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecepcionistaDTO {

    private Integer id;

    @Valid
    @NotNull(message = "La persona es obligatoria")
    private PersonaCrearDTO persona;

    @NotBlank(message = "El código de empleado es obligatorio")
    @Size(max = 25, message = "El código de empleado no debe exceder 25 caracteres")
    private String codigoEmpleado;

    private Integer estado;

}