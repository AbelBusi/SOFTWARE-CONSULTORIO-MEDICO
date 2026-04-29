package com.salud.consultorio.dto.paciente;

import com.salud.consultorio.dto.persona.PersonaRespuestaDTO;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
public class PacienteRespuestaDTO {

    private Integer id;

    private String entidadAseguradora;

    private String codigoAseguradora;

    private Integer estado;

    private PersonaRespuestaDTO persona;

}