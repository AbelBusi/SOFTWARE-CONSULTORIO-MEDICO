package com.salud.consultorio.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EspecialidadRefDoctorDTO {

    @NotNull(message = "El id de la especialidad es obligatorio")
    private Integer id;

}