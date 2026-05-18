package com.salud.consultorio.dto.doctor;

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