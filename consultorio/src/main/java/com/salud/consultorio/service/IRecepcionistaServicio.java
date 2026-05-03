package com.salud.consultorio.service;

import com.salud.consultorio.dto.recepcionista.NombreRecepcionistaDTO;
import com.salud.consultorio.dto.recepcionista.RecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;

import java.util.List;
import java.util.Optional;

public interface IRecepcionistaServicio{

    List<NombreRecepcionistaDTO> listaNombres();

    List<Recepcionista> listarTodos();

    Optional<Recepcionista> obtenerPorId(Integer id);

    Recepcionista crear(RecepcionistaDTO dto);

    Recepcionista actualizar(RecepcionistaDTO dto, Integer id);

    void eliminarPorId(Integer id);

}