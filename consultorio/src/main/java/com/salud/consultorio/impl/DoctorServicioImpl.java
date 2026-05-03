package com.salud.consultorio.impl;

import com.salud.consultorio.dto.doctor.*;
import com.salud.consultorio.model.entity.Doctor;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.mapper.IDoctorMapper;
import com.salud.consultorio.model.mapper.IEspecialidadMapper;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.IDoctorRepositorio;
import com.salud.consultorio.service.IDoctorServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorServicioImpl implements IDoctorServicio {

    private final IDoctorRepositorio doctorRepositorio;
    private final EspecialidadServicioImpl especialidadServicio;
    private final PersonaServicioImpl personaServicio;
    private final IDoctorMapper doctorMapper;
    private final IPersonaMapper personaMapper;
    private final IEspecialidadMapper especialidadMapper;

    @Transactional(readOnly = true)
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
    public DoctorRespuestaDTO crear(DoctorCrearDTO dto) {

        if (!especialidadServicio.existeEspecialidad(dto.getEspecialidad().getId())){
            throw new EntityNotFoundException("No existe la especialidad en la entidad");
        }

        if (personaServicio.existePersonaDni(dto.getPersona().getDni())){
            throw new DataIntegrityViolationException("El dni ya existe en la entidad");
        }

        Doctor doctor = doctorMapper.doctordDtoToDoctor(dto);

        Especialidad especialidad = especialidadMapper.especialidadRefDtoToEspecialidad(dto.getEspecialidad());

        Persona persona = personaMapper.personaDtoToPersona(dto.getPersona());

        doctor.setEspecialidad(especialidad);

        doctor.setPersona(persona);

        Doctor guardado = doctorRepositorio.save(doctor);

        return doctorMapper.toDto(guardado);
    }

    @Transactional
    @Override
    public DoctorRespuestaDTO actualizar(DoctorActualizarDTO dto, Integer id) {

        Doctor doctor = doctorRepositorio.findByIdConPersona(id).orElseThrow(
                ()-> new EntityNotFoundException("El doctor no existe en la entidad")
        );

        if (!especialidadServicio.existeEspecialidad(dto.getEspecialidad().getId())){
            throw new EntityNotFoundException("No existe la especialidad en la entidad");
        }

        Especialidad especialidad = especialidadMapper.especialidadRefDtoToEspecialidad(dto.getEspecialidad());

        doctor.setEspecialidad(especialidad);

        doctorMapper.updateFromDto(dto,doctor);

        personaMapper.updateFromDto(dto.getPersona(),doctor.getPersona());

        return doctorMapper.toDto(doctor);
    }

    @Transactional(readOnly = true)
    @Override
    public DoctorEspecialidadLeerDTO leerPorId(Integer id) {
        return doctorRepositorio.todosDoctoresEspecialidadesPorId(id)
                .orElseThrow( ()-> new EntityNotFoundException("No existe el doctor solicitado")
        );
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

    @Transactional(readOnly = true)
    @Override
    public List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidad() {
        return doctorRepositorio.todosDoctoresEspecialidades();
    }

    @Transactional(readOnly = true)
    @Override
    public List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadActivos() {
        return doctorRepositorio.todosDoctoresEspecialidadesActivos();
    }

    @Transactional(readOnly = true)
    @Override
    public List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadInactivos() {
        return doctorRepositorio.todosDoctoresEspecialidadesInactivos();
    }

    @Transactional(readOnly = true)
    @Override
    public List<NombreDoctoresDTO> listaNombreDoctoresDtos() {
        return doctorRepositorio.listarDoctoresResumen();
    }
}
