package com.salud.consultorio.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecepcionistaRefCitaMedicaDTO {

    @NotNull(message = "El id de la recepcionista es obligatorio")
    private Integer id;

}