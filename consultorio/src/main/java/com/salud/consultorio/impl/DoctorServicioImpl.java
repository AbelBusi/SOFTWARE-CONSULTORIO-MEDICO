package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.DoctorDTO;
import com.salud.consultorio.model.entity.Doctor;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.mapper.IDoctorMapper;
import com.salud.consultorio.model.mapper.IEspecialidadMapper;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.IDoctorRepositorio;
import com.salud.consultorio.service.IDoctorServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorServicioImpl implements IDoctorServicio {

    private final IDoctorRepositorio doctorRepositorio;
    private final EspecialidadServicioImpl especialidadServicio;
    private final IDoctorMapper doctorMapper;
    private final IPersonaMapper personaMapper;
    private final IEspecialidadMapper especialidadMapper;

    @Override
    public List<Doctor> listarTodos() {
        return doctorRepositorio.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Doctor> obtenerPorId(Integer integer) {
        return doctorRepositorio.findById(integer);
    }


    @Transactional
    @Override
    public Doctor crear(DoctorDTO doctorDTO) {

        Especialidad especialidad = especialidadServicio.obtenerPorId(
                doctorDTO.getEspecialidad().getId())
                .orElseThrow(() -> new RuntimeException("No existe la especialidad"));

        Persona persona = personaMapper.personaDtoToPersona(doctorDTO.getPersona());


        Doctor doctor = doctorMapper.doctordDtoToDoctor(doctorDTO);

        doctor.setPersona(persona);

        doctor.setEspecialidad(especialidad);

        persona.setDoctor(doctor);

        return doctorRepositorio.save(doctor);
    }

    @Override
    public Doctor actualizar(DoctorDTO doctorDTO, Integer id) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

}
