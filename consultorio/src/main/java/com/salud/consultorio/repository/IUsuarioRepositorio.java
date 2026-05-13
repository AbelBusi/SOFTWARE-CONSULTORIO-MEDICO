package com.salud.consultorio.repository;

import com.salud.consultorio.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    boolean existsByUsuario(String usuario);

    @Query("""
        SELECT 
            CASE WHEN COUNT(*) > 0 
            THEN true 
            ELSE false END
        FROM Usuario u
        WHERE u.id=:id
    """)
    boolean existeUsuarioPersona(
            @Param("id") Integer id
    );

}