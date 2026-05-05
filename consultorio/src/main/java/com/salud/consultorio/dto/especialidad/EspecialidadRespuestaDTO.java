package com.salud.consultorio.dto.especialidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadRespuestaDTO {

    private Integer id;

    private String nombre;

    private String descripcion;

    private Integer estado;

}