package com.salud.consultorio.service;

import java.util.List;
import java.util.Optional;

public interface IBasicoServicio<T,DTO,ID>{

    List<T> listarTodos();

    Optional<T> obtenerPorId(ID id);

    T crear(DTO dto);

    T actualizar(DTO dto);

    void eliminarPorId(ID id);

}