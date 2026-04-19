package com.salud.consultorio.impl;

import com.salud.consultorio.model.Especialidad;
import com.salud.consultorio.service.IEspecialidadServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EspecialidadServicioImpl implements IEspecialidadServicio
{

    @Override
    public List<Especialidad> listarTodos() {
        return null;
    }

    @Override
    public Optional<Especialidad> traerPorId(Integer integer) {
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