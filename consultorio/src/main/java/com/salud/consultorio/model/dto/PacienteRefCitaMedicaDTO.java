package com.salud.consultorio.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PacienteRefCitaMedicaDTO {

    @NotNull(message = "El id del paciente es obligatorio")
    private Integer id;

}