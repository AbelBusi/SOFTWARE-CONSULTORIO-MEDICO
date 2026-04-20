package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.CitaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICitaMedicaRepositorio extends JpaRepository<CitaMedica,Integer> {
}
