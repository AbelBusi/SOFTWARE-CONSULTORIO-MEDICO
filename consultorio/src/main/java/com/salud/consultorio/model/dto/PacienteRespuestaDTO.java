package com.salud.consultorio.model.dto;

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

    private PersonaCrearDTO persona;

}