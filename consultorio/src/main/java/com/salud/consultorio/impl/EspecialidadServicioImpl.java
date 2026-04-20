package com.salud.consultorio.impl;

import com.salud.consultorio.model.mapper.IEspecialidadMapper;
import com.salud.consultorio.model.dto.EspecialidadDTO;
import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.repository.IEspecialidadRepositorio;
import com.salud.consultorio.service.IEspecialidadServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EspecialidadServicioImpl implements IEspecialidadServicio {

    private final IEspecialidadRepositorio especialidadRepositorio;
    private final IEspecialidadMapper especialidadMapper;

    @Transactional(readOnly = true)
    @Override
    public List<Especialidad> listarTodos() {

        return especialidadRepositorio.findAll();

    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Especialidad> obtenerPorId(Integer integer) {

        return especialidadRepositorio.findById(integer);

    }

    @Transactional
    @Override
    public Especialidad crear(EspecialidadDTO especialidadDTO) {

        Especialidad especialidad = especialidadMapper.especialidadDtoToEspecialidad(especialidadDTO);

        return especialidadRepositorio.save(especialidad);
    }

    @Override
    public Especialidad actualizar(EspecialidadDTO especialidad) {

        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

    @Override
    public void ejemplo() {

    }
}