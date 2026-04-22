package com.salud.consultorio.impl;

import com.salud.consultorio.model.dto.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.entity.Recepcionista;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.model.mapper.IRecepnionistaMapper;
import com.salud.consultorio.repository.IRecepcionistaRepositorio;
import com.salud.consultorio.service.IRecepcionistaServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecepcionistaServicioImpl implements IRecepcionistaServicio {

    private final IRecepcionistaRepositorio recepcionistaRepositorio;
    private final IRecepnionistaMapper recepnionistaMapper;
    private final IPersonaMapper personaMapper;

    @Transactional(readOnly = true)
    @Override
    public List<Recepcionista> listarTodos() {
        return recepcionistaRepositorio.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Recepcionista> obtenerPorId(Integer integer) {
        return recepcionistaRepositorio.findById(integer);
    }

    @Transactional
    @Override
    public Recepcionista crear(RecepcionistaDTO recepcionistaDTO) {

        Persona persona = personaMapper.personaDtoToPersona(recepcionistaDTO.getPersona());

        Recepcionista recepcionista = recepnionistaMapper.recepcionistaDtoToRecepcionista(recepcionistaDTO);

        recepcionista.setPersona(persona);
        persona.setRecepcionista(recepcionista);

        return recepcionistaRepositorio.save(recepcionista);
    }

    @Override
    public Recepcionista actualizar(RecepcionistaDTO recepcionistaDTO, Integer id) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

}
