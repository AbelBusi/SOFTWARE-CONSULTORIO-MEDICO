package com.salud.consultorio.dto.rol;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RolRefDTO {

    @NotNull(message = "El id del rol es obligatorio")
    private Integer id;

}