package com.salud.consultorio.dto.especialidad;

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
public class NombreEspecialidadesDTO {
    @NotNull(message = "El id de la especialidad es obligatorio")
    private Integer idEspecialidad;

    @NotBlank(message = "El nombre de la especialidad es obligatorio")
    private String nombreEspecialidad;
}