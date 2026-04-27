package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.ActualizarCitaMedicaDTO;
import com.salud.consultorio.model.dto.CitaMedicaDTO;
import com.salud.consultorio.model.dto.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.*;
import com.salud.consultorio.model.mapper.ICitaMedicaMapper;
import com.salud.consultorio.model.mapper.IPacienteMapper;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.*;
import com.salud.consultorio.service.ICitaMedicaServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CitaMedicaServicioImpl implements ICitaMedicaServicio {

    private final ICitaMedicaRepositorio citaMedicaRepositorio;
    private final ReferenciaServicio referenciaServicio;
    private final ICitaMedicaMapper citaMedicaMapper;
    private final IPacienteMapper pacienteMapper;
    private final IPersonaMapper personaMapper;

    @Override
    public List<CitaMedica> listarTodos() {
        return citaMedicaRepositorio.findAll();
    }

    @Transactional
    @Override
    public Optional<CitaMedica> obtenerPorId(Integer integer) {
        return citaMedicaRepositorio.findById(integer);
    }

    @Transactional
    @Override
    public CitaMedica crear(CitaMedicaDTO citaMedicaDTO) {

        Doctor doctor = referenciaServicio.getRef(Doctor.class,citaMedicaDTO.getDoctor().getId());

        Especialidad especialidad = referenciaServicio.getRef(Especialidad.class, citaMedicaDTO.getEspecialidad().getId());
        Recepcionista recepcionista = referenciaServicio.getRef(Recepcionista.class, citaMedicaDTO.getRecepcionista().getId());

        Persona persona = personaMapper.personaDtoToPersona(citaMedicaDTO.getPaciente().getPersona());
        Paciente paciente = pacienteMapper.pacienteDtoToPaciente(citaMedicaDTO.getPaciente());

        CitaMedica citaMedica = citaMedicaMapper.citaMedicaDtoToCitaMedica(citaMedicaDTO);

        citaMedica.setDoctor(doctor);
        citaMedica.setEspecialidad(especialidad);
        citaMedica.setRecepcionista(recepcionista);
        citaMedica.setPaciente(paciente);

        paciente.setPersona(persona);

        persona.setPaciente(paciente);

        return citaMedicaRepositorio.save(citaMedica);
    }

    @Override
    public CitaMedica actualizar(CitaMedicaDTO citaMedicaDTO, Integer integer) {
        return null;
    }

    @Transactional
    @Override
    public CitaMedica actualizarCita(ActualizarCitaMedicaDTO actualizarCitaMedicaDTO, Integer id) {

        CitaMedica citaMedica = obtenerPorId(id).orElseThrow(() ->
                new EntityNotFoundException("Cita Medica no existe"));

        citaMedicaMapper.actualizarCitaDtoToActualizarCita(actualizarCitaMedicaDTO,citaMedica);

        Doctor doctor = referenciaServicio.getRef(Doctor.class,actualizarCitaMedicaDTO.getDoctor().getId());

        Especialidad especialidad = referenciaServicio.getRef(Especialidad.class, actualizarCitaMedicaDTO.getEspecialidad().getId());

        Paciente paciente = referenciaServicio.getRef(Paciente.class, actualizarCitaMedicaDTO.getPaciente().getId());

        Recepcionista recepcionista = referenciaServicio.getRef(Recepcionista.class, actualizarCitaMedicaDTO.getRecepcionista().getId());

        citaMedica.setDoctor(doctor);
        citaMedica.setEspecialidad(especialidad);
        citaMedica.setPaciente(paciente);
        citaMedica.setRecepcionista(recepcionista);

        return citaMedicaRepositorio.save(citaMedica);

    }

    @Override
    public void eliminarPorId(Integer integer) {

        CitaMedica citaMedica = obtenerPorId(integer).orElseThrow(
                () -> new EntityNotFoundException("No existe la cita medica")
        );

        citaMedica.setEstado(0);

        citaMedicaRepositorio.save(citaMedica);

    }

    @Transactional
    @Override
    public CitaMedicaDTO mostrarCitaMedicaPorId(CitaMedica citaMedica) {

        CitaMedica cita = obtenerPorId(citaMedica.getId()).orElseThrow(()-> new EntityNotFoundException("No existe en la entidad"));

        CitaMedicaDTO citaMedicaDTO =citaMedicaMapper.citaMedicaToCitaMedicaDto(cita);

        return  citaMedicaDTO;
    }

    @Override
    public List<LeerCitaMedicaDTO> leerCitasMedicas() {
        return citaMedicaRepositorio.leerCitasMedicas();
    }
}