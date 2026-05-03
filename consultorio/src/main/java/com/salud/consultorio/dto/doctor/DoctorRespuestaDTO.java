package com.salud.consultorio.dto.doctor;

import com.salud.consultorio.dto.persona.PersonaCrearDTO;
import com.salud.consultorio.dto.persona.PersonaRespuestaDTO;
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
public class DoctorRespuestaDTO {

    private Integer id;

    private String cpm;

    private String rne;

    private String consejoRegional;

    private String foto;

    private PersonaRespuestaDTO persona;

    private EspecialidadRefDoctorDTO especialidad;

    private Integer estado;

}