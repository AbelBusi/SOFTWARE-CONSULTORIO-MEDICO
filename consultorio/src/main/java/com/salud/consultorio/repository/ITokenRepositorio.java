package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITokenRepositorio extends JpaRepository<Token,Integer> {
}