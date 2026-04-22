package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.PersonaDTO;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.repository.IPersonaRepositorio;
import com.salud.consultorio.service.IEspecialidadServicio;
import com.salud.consultorio.service.IPersonaServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonaServicioImpl implements IPersonaServicio {

    private final IPersonaRepositorio personaRepositorio;
    private final IPersonaMapper personaMapper;

    @Transactional(readOnly = true)
    @Override
    public List<Persona> listarTodos() {
        return personaRepositorio.findAll();
    }

    @Override
    public Optional<Persona> obtenerPorId(Integer integer) {
        return Optional.empty();
    }

    @Transactional
    @Override
    public Persona crear(PersonaDTO personaDTO) {

        Persona persona =personaMapper.personaDtoToPersona(personaDTO);

        return personaRepositorio.save(persona);
    }

    @Override
    public Persona actualizar(PersonaDTO personaDTO, Integer id) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

}
