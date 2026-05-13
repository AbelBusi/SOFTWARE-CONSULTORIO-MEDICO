package com.salud.consultorio.dto.doctor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class DoctorEspecialidadPorIdDT {

    private Integer id;

    private String nombres;

    public DoctorEspecialidadPorIdDT(Integer id, String nombres) {
        this.id = id;
        this.nombres = nombres;
    }
}
