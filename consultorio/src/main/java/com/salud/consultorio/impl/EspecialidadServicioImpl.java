package com.salud.consultorio.impl;

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

    @Transactional(readOnly = true)
    @Override
    public List<Especialidad> listarTodos() {
        return especialidadRepositorio.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Especialidad> obtenerPorId(Integer integer) {
        return Optional.empty();
    }

    @Override
    public Especialidad crear(Especialidad especialidad) {
        return null;
    }

    @Override
    public Especialidad actualizar(Especialidad especialidad) {
        return null;
    }

    @Override
    public void eliminarPorId(Integer integer) {

    }

    @Override
    public void ejemplo() {

    }
}