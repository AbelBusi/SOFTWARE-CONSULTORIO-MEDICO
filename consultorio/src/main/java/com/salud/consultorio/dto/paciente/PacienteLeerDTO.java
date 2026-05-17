package com.salud.consultorio.dto.paciente;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PacienteLeerDTO {

    private Integer id;
    private String dni;
    private String paciente;
    private String genero;
    private String telefono;
    private String entidadAseguradora;
    private Integer estado;

    public PacienteLeerDTO(Integer id, String dni, String nombres, String genero, String telefono, String entidadAseguradora, Integer estado) {
        this.id = id;
        this.dni = dni;
        this.paciente = nombres;
        this.genero = genero;
        this.telefono = telefono;
        this.entidadAseguradora = entidadAseguradora;
        this.estado = estado;
    }
}