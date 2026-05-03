package com.salud.consultorio.impl;

import com.salud.consultorio.dto.especialidad.NombreEspecialidadesDTO;
import com.salud.consultorio.model.mapper.IEspecialidadMapper;
import com.salud.consultorio.dto.especialidad.EspecialidadDTO;
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

    @Transactional
    @Override
    public Especialidad actualizar(EspecialidadDTO especialidadDTO, Integer id) {

        if (especialidadDTO.getId() == null) {
            throw new RuntimeException("El ID no puede ser null para actualizar");
        }
        Optional<Especialidad> optional = especialidadRepositorio.findById(especialidadDTO.getId());

        if (optional.isPresent()) {

            Especialidad especialidadExistente = optional.get();

            especialidadExistente.setNombre(especialidadDTO.getNombre());

            return especialidadRepositorio.save(especialidadExistente);

        } else {
            throw new RuntimeException("Especialidad no encontrada con ID: " + especialidadDTO.getId());
        }
    }

    @Transactional
    @Override
    public void eliminarPorId(Integer id) {

        if (!especialidadRepositorio.existsById(id)) {
            throw new RuntimeException("Especialidad no encontrada con ID: " + id);
        }

        especialidadRepositorio.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean existeEspecialidad(Integer id) {
        return especialidadRepositorio.existsById(id);
    }

    @Override
    public List<NombreEspecialidadesDTO> listaNombres() {
        return especialidadRepositorio.listarEspecialidades();
    }
}