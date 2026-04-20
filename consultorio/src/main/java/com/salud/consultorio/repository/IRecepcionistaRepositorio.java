package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Recepcionista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRecepcionistaRepositorio extends JpaRepository<Recepcionista,Integer> {
}