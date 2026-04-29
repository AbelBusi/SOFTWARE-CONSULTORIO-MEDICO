package com.salud.consultorio.service;

import com.salud.consultorio.dto.DoctorDTO;
import com.salud.consultorio.dto.NombreDoctoresDTO;
import com.salud.consultorio.model.entity.Doctor;

import java.util.List;
import java.util.Optional;

public interface IDoctorServicio {

    List<NombreDoctoresDTO> listaNombreDoctoresDtos();

    List<Doctor> listarTodos();

    Optional<Doctor> obtenerPorId(Integer id);

    Doctor crear(DoctorDTO dto);

    Doctor actualizar(DoctorDTO dto, Integer id);

    void eliminarPorId(Integer id);
}
