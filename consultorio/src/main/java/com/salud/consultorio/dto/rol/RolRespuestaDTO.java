package com.salud.consultorio.dto.rol;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class RolRespuestaDTO {

    private Integer id;

    private String nombre;

    private String descripcion;

    private Integer estado;

}