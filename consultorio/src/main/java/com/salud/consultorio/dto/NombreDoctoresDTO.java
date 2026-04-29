package com.salud.consultorio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NombreDoctoresDTO {
    @NotNull(message = "El id del doctor es obligatorio")
    private Integer idDoctor;

    @NotBlank(message = "El nombre del doctor es obligatorio")
    private String nombreDoctor;
}