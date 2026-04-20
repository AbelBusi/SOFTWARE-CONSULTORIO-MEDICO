package com.salud.consultorio.model.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EspecialidadRefDoctor {

    @NotNull(message = "El id de la especialidad es obligatorio")
    private Integer id;

}