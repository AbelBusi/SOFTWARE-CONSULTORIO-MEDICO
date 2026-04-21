package com.salud.consultorio.impl;

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
    private final DoctorServicioImpl doctorServicio;
    private final EspecialidadServicioImpl especialidadServicio;
    private final PacienteServicioImpl pacienteServicio;
    private final RecepcionistaServicioImpl recepcionistaServicio;
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

        Doctor doctor = doctorServicio.obtenerPorId(citaMedicaDTO.getDoctor().getId())
                .orElseThrow(() -> new EntityNotFoundException("Doctor no encontrado en el sistema"));

        Especialidad especialidad = especialidadServicio.obtenerPorId(citaMedicaDTO.getEspecialidad().getId())
                .orElseThrow(() -> new EntityNotFoundException("Especialidad mo encontrada"));

        Recepcionista recepcionista = recepcionistaServicio.obtenerPorId(citaMedicaDTO.getRecepcionista().getId())
                .orElseThrow(()-> new EntityNotFoundException("Recepcionista no encontrado "));

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
    public CitaMedica actualizar(CitaMedicaDTO citaMedicaDTO) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

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
