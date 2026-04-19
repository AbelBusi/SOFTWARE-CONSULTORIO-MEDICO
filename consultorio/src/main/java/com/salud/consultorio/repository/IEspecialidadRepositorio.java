package com.salud.consultorio.repository;

import com.salud.consultorio.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEspecialidadRepositorio extends JpaRepository<Especialidad, Integer> {
}
