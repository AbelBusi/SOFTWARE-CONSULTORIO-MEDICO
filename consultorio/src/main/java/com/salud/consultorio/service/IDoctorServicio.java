package com.salud.consultorio.service;

import com.salud.consultorio.dto.doctor.DoctorCrearDTO;
import com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO;
import com.salud.consultorio.dto.doctor.DoctorRespuestaDTO;
import com.salud.consultorio.dto.doctor.NombreDoctoresDTO;
import com.salud.consultorio.model.entity.Doctor;

import java.util.List;
import java.util.Optional;

public interface IDoctorServicio {

    List<NombreDoctoresDTO> listaNombreDoctoresDtos();

    List<Doctor> listarTodos();

    Optional<Doctor> obtenerPorId(Integer id);

    DoctorRespuestaDTO crear(DoctorCrearDTO dto);

    Doctor actualizar(DoctorCrearDTO dto, Integer id);

    void eliminarPorId(Integer id);

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidad();

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadActivos();

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadInactivos();

}
