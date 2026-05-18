package com.salud.consultorio.dto.doctor;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DoctorEspecialidadLeerDTO {

    private Integer id;
    private String cpm;
    private String nombre;
    private String apellidos;
    private String especialidad;
    private String genero;
    private Integer estado;

    public DoctorEspecialidadLeerDTO(Integer id, String cpm, String nombre, String apellidos, String especialidad, String genero, Integer estado) {
        this.id = id;
        this.cpm = cpm;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.especialidad = especialidad;
        this.genero = genero;
        this.estado = estado;
    }
}