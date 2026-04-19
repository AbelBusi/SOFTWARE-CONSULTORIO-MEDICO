package com.salud.consultorio.service;

import java.util.List;
import java.util.Optional;

public interface IBasicoServicio<T,ID>{

    List<T> listarTodos();

    Optional<T> obtenerPorId(ID id);

    T crear(T t);

    T actualizar(T t);

    void eliminarPorId(ID id);

}