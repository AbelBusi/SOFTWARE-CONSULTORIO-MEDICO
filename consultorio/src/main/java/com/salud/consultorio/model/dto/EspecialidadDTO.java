package com.salud.consultorio.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadDTO {

    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 40, message = "El nombre no puede superar los 40 caracteres")
    private String nombre;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 100, message = "La descripción no puede superar los 100 caracteres")
    private String descripcion;

    private Integer estado;

}