package com.salud.consultorio.dto.persona;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonaRefDTO {

    @NotNull(message = "El id de la persona es obligatorio")
    private Integer id;

}