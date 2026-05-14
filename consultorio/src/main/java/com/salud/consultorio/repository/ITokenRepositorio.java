package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITokenRepositorio extends JpaRepository<Token,Integer> {

    List<Token> findAllByUsuarioIdAndExpiredFalseAndRevokedFalse(Integer id);


}