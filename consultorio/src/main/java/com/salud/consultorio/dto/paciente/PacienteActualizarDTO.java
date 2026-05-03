package com.salud.consultorio.dto.paciente;

import com.salud.consultorio.dto.persona.PersonaActualizarDTO;
import com.salud.consultorio.dto.persona.PersonaCrearDTO;
import com.salud.consultorio.dto.persona.PersonaRespuestaDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PacienteActualizarDTO {

    @NotBlank(message = "La entidad aseguradora es obligatoria")
    @Size(max = 8, message = "La entidad aseguradora no debe exceder 8 caracteres")
    private String entidadAseguradora;

    @NotBlank(message = "El código aseguradora es obligatorio")
    @Size(max = 20, message = "El código aseguradora no debe exceder 20 caracteres")
    private String codigoAseguradora;

    private Integer estado;

    @Valid
    @NotNull(message = "La persona es obligatoria")
    private PersonaActualizarDTO persona;

}