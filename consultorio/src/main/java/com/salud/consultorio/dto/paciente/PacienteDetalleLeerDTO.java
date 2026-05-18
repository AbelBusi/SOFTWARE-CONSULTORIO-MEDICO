package com.salud.consultorio.dto.paciente;

import com.salud.consultorio.dto.persona.PersonaLeerDTO;
import lombok.*;


@NoArgsConstructor
@Getter
@Setter
public class PacienteDetalleLeerDTO {

    private Integer id;

    private PersonaLeerDTO persona;

    private String entidadAseguradora;

    private String codigoAseguradora;

    private Integer estado;

    public PacienteDetalleLeerDTO(Integer id, PersonaLeerDTO persona, String entidadAseguradora, String codigoAseguradora, Integer estado) {
        this.id = id;
        this.persona = persona;
        this.entidadAseguradora = entidadAseguradora;
        this.codigoAseguradora = codigoAseguradora;
        this.estado = estado;
    }
}