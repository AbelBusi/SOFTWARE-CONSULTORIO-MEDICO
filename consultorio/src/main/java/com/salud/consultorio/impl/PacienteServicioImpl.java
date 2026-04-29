package com.salud.consultorio.impl;

import com.salud.consultorio.dto.paciente.LeerPacienteDTO;
import com.salud.consultorio.dto.NombrePacientesDTO;
import com.salud.consultorio.dto.paciente.PacienteActualizarDTO;
import com.salud.consultorio.dto.paciente.PacienteCrearDTO;
import com.salud.consultorio.dto.paciente.PacienteRespuestaDTO;
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
    private final IPacienteMapper pacienteMapper;
    private final IPersonaMapper personaMapper;

    @Transactional(readOnly = true)
    @Override
    public List<Paciente> listarTodos() {
        return pacienteRepositorio.findAll();
    }

    @Override
    public Optional<Paciente> obtenerPorId(Integer integer) {
        return pacienteRepositorio.findAlTPacientes(integer);
    }

    @Transactional
    @Override
    public Paciente crear(PacienteCrearDTO dto) {

        // 1. Crear y guardar persona
        Persona persona = personaMapper.personaDtoToPersona(dto.getPersona());
        /*persona = personaServicio.crear(persona);
*/
        // 2. Crear paciente y asignar persona
        Paciente paciente = pacienteMapper.pacienteDtoToPaciente(dto);
        paciente.setPersona(persona);

        // 3. Guardar paciente
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

        Paciente pacienteExiste = pacienteRepositorio.findByIdConPersona(id).orElseThrow();
        pacienteMapper.pacienteToPacienteDto(actualizarDTO,pacienteExiste);

        Persona personaExiste=pacienteExiste.getPersona();

        personaMapper.personaToPersonaDto(actualizarDTO.getPersona(),personaExiste);

        PacienteRespuestaDTO respuestaDTO= PacienteRespuestaDTO.builder()
                .id(pacienteExiste.getId()).entidadAseguradora(pacienteExiste.getEntidadAseguradora())
                .codigoAseguradora(pacienteExiste.getCodigoAseguradora())
                .estado(personaExiste.getEstado()).persona(actualizarDTO.getPersona()).build();

        return respuestaDTO;

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
        return pacienteRepositorio.traerPaciente(id).orElseThrow(()-> new EntityNotFoundException("No existe el paciente"));
    }

    @Transactional(readOnly = true)
    @Override
    public List<LeerPacienteDTO> listarPacientes() {
        return pacienteRepositorio.leerPacientes();
    }
}