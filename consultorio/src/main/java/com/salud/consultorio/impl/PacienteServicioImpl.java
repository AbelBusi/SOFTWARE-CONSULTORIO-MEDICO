package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.*;
import com.salud.consultorio.model.entity.Paciente;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.mapper.IPacienteMapper;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.IPacienteRepositorio;
import com.salud.consultorio.service.IPacienteServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PacienteServicioImpl implements IPacienteServicio {

    private final IPacienteRepositorio pacienteRepositorio;
    private final PersonaServicioImpl personaServicio;
    private final IPacienteMapper pacienteMapper;
    private final IPersonaMapper personaMapper;
    private final ReferenciaServicio referenciaServicio;

    @Transactional(readOnly = true)
    @Override
    public List<Paciente> listarTodos() {
        return pacienteRepositorio.findAll();
    }

    @Override
    public Optional<Paciente> obtenerPorId(Integer integer) {
        return pacienteRepositorio.findById(integer);
    }

    @Transactional
    @Override
    public Paciente crear(PacienteCrearDTO pacienteCrearDTO) {

        Persona persona = personaMapper.personaDtoToPersona(pacienteCrearDTO.getPersona());

        Paciente paciente =pacienteMapper.pacienteDtoToPaciente(pacienteCrearDTO);

        paciente.setPersona(persona);
        persona.setPaciente(paciente);
        return pacienteRepositorio.save(paciente);
    }

    @Transactional
    @Override
    public Paciente actualizar(PacienteCrearDTO pacienteCrearDTO, Integer id) {

        Paciente pacienteExiste = obtenerPorId(id).orElseThrow(()-> new EntityNotFoundException("El paciente no existe"));

        //pacienteMapper.pacienteToPacienteDto(pacienteCrearDTO,pacienteExiste);

        Persona personaExiste=pacienteExiste.getPersona();

        personaMapper.personaToPersonaDto(pacienteCrearDTO.getPersona(),personaExiste);

        return pacienteRepositorio.save(pacienteExiste);
    }

    @Transactional
    @Override
    public PacienteRespuestaDTO actualizarRespuesta(PacienteActualizarDTO actualizarDTO, Integer id) {

        Paciente pacienteExiste = obtenerPorId(id).orElseThrow(()-> new EntityNotFoundException("El paciente no existe"));

        pacienteMapper.pacienteToPacienteDto(actualizarDTO,pacienteExiste);

        Persona personaExiste=pacienteExiste.getPersona();

        personaMapper.personaToPersonaDto(actualizarDTO.getPersona(),personaExiste);

        pacienteRepositorio.save(pacienteExiste);

        return pacienteMapper.pacienteToPacienteRespuesta(pacienteExiste);

    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

    @Override
    public List<NombrePacientesDTO> listarPacientesDtoList() {
        return pacienteRepositorio.listarPacientesResumen();
    }

    @Transactional(readOnly = true)
    @Override
    public LeerPacienteDTO traerPaciente(Integer id) {
        Paciente paciente = referenciaServicio.getRef(Paciente.class,id);
        return pacienteRepositorio.traerPaciente(id).orElseThrow(()-> new EntityNotFoundException("No existe el paciente"));
    }

    @Transactional(readOnly = true)
    @Override
    public List<LeerPacienteDTO> listarPacientes() {
        return pacienteRepositorio.leerPacientes();
    }
}