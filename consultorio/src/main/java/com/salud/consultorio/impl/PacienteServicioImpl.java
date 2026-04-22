package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.NombrePacientesDTO;
import com.salud.consultorio.model.dto.PacienteDTO;
import com.salud.consultorio.model.entity.Paciente;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.mapper.IPacienteMapper;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.IPacienteRepositorio;
import com.salud.consultorio.service.IPacienteServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PacienteServicioImpl implements IPacienteServicio {

    private final IPacienteRepositorio pacienteRepositorio;
    private final IPacienteMapper pacienteMapper;
    private final IPersonaMapper personaMapper;

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
    public Paciente crear(PacienteDTO pacienteDTO) {

        Persona persona = personaMapper.personaDtoToPersona(pacienteDTO.getPersona());

        Paciente paciente =pacienteMapper.pacienteDtoToPaciente(pacienteDTO);

        paciente.setPersona(persona);
        persona.setPaciente(paciente);
        return pacienteRepositorio.save(paciente);
    }

    @Override
    public Paciente actualizar(PacienteDTO pacienteDTO, Integer id) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

    @Override
    public List<NombrePacientesDTO> listarPacientesDtoList() {
        return pacienteRepositorio.listarPacientesResumen();
    }
}
