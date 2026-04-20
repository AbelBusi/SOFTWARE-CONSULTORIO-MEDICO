package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPacienteRepositorio extends JpaRepository<Paciente,Integer> {
}
