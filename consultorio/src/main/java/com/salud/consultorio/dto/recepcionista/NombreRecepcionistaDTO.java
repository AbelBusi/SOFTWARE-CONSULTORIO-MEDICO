package com.salud.consultorio.dto.recepcionista;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de nombres de recepcionistas")
public class NombreRecepcionistaDTO {

    @NotNull(message = "El id del recepcionista es obligatorio")
    @Schema(
            description = "Identificador único del recepcionista",
            example = "1"
    )
    private Integer idRecepcionista;

    @NotBlank(message = "El nombre del recepcionista es obligatorio")
    @Schema(
            description = "Nombre completo del recepcionista",
            example = "María López"
    )
    private String nombreRecepcionista;
}