package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    boolean existsByUsuario(String usuario);

}