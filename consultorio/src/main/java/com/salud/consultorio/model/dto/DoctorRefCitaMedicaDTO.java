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
public class DoctorRefCitaMedicaDTO {

    @NotNull(message = "El id del doctor es obligatorio")
    private Integer id;

}