package com.salud.consultorio.service;

import com.salud.consultorio.dto.doctor.*;
import com.salud.consultorio.model.entity.Doctor;

import java.util.List;
import java.util.Optional;

public interface IDoctorServicio {

    List<NombreDoctoresDTO> listaNombreDoctoresDtos();

    List<Doctor> listarTodos();

    Boolean existeDoctor(Integer id);

    Optional<Doctor> obtenerPorId(Integer id);

    DoctorRespuestaDTO crear(DoctorCrearDTO dto);

    DoctorRespuestaDTO actualizar(DoctorActualizarDTO dto, Integer id);

    DoctorEspecialidadLeerDTO leerPorId(Integer id);

    void eliminarPorId(Integer id);

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidad();

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadActivos();

    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadInactivos();

}