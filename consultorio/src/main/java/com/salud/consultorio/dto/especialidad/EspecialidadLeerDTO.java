package com.salud.consultorio.dto.especialidad;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
public class EspecialidadLeerDTO {

    private Integer id;

    private String nombre;

    private String descripcion;

    private Integer estado;

    public EspecialidadLeerDTO(Integer id, String nombre, String descripcion, Integer estado) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}