package com.salud.consultorio.service;

import com.salud.consultorio.model.dto.DoctorDTO;
import com.salud.consultorio.model.dto.NombreDoctoresDTO;
import com.salud.consultorio.model.entity.Doctor;

import java.util.List;

public interface IDoctorServicio extends IBasicoServicio<Doctor, DoctorDTO,Integer>{

    List<NombreDoctoresDTO> listaNombreDoctoresDtos();
}
