package com.salud.consultorio.service;


import com.salud.consultorio.dto.EspecialidadDTO;
import com.salud.consultorio.dto.NombreEspecialidadesDTO;
import com.salud.consultorio.model.entity.Especialidad;

import java.util.List;
import java.util.Optional;

public interface IEspecialidadServicio{

    List<NombreEspecialidadesDTO> listaNombres();

    List<Especialidad> listarTodos();

    Optional<Especialidad> obtenerPorId(Integer id);

    Especialidad crear(EspecialidadDTO dto);

    Especialidad actualizar(EspecialidadDTO dto, Integer id);

    void eliminarPorId(Integer id);

}
