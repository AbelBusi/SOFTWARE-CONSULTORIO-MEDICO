package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDoctorRepositorio extends JpaRepository<Doctor, Integer> {
}
