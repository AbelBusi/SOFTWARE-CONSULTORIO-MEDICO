package com.salud.consultorio.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NombreRecepcionistaDTO {
    @NotNull(message = "El id del recepcionista es obligatorio")
    private Integer idRecepcionista;

    @NotBlank(message = "El nombre del recepcionista es obligatorio")
    private String nombreRecepcionista;
}