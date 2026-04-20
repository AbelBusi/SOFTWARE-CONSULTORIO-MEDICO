package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Especialidad;
import com.salud.consultorio.model.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPersonaRepositorio extends JpaRepository<Persona, Integer> {
}
