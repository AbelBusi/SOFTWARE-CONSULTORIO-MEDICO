package com.salud.consultorio.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {

    private Integer id;

    @NotBlank(message = "El CPM es obligatorio")
    @Size(max = 20, message = "El CPM no debe exceder 20 caracteres")
    private String cpm;

    @Size(max = 20, message = "El RNE no debe exceder 20 caracteres")
    private String rne;

    @NotBlank(message = "El consejo regional es obligatorio")
    @Size(max = 50, message = "El consejo regional no debe exceder 50 caracteres")
    private String consejoRegional;

    @NotBlank(message = "La foto es obligatoria")
    @Size(max = 100, message = "La foto no debe exceder 100 caracteres")
    private String foto;

    @Valid
    @NotNull(message = "La persona es obligatoria")
    private PersonaCrearDTO persona;

    @Valid
    @NotNull(message = "La especialidad del doctor es obligatoria")
    private EspecialidadRefDoctorDTO especialidad;

    private Integer estado;

}