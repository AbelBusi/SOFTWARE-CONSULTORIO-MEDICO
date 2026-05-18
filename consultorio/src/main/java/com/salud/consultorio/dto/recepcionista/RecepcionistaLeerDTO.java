package com.salud.consultorio.dto.recepcionista;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RecepcionistaLeerDTO {

    private Integer id;
    private String codigoEmpleado;
    private String nombre;
    private String apellidos;
    private String genero;
    private Integer estado;

    public RecepcionistaLeerDTO(Integer id, String codigoEmpleado, String nombre, String apellidos, String genero, Integer estado) {
        this.id = id;
        this.codigoEmpleado = codigoEmpleado;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.genero = genero;
        this.estado = estado;
    }
}