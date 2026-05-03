package com.salud.consultorio.repository;

import com.salud.consultorio.dto.especialidad.NombreEspecialidadesDTO;
import com.salud.consultorio.model.entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEspecialidadRepositorio extends JpaRepository<Especialidad, Integer> {

    @Query(value = """
    SELECT 
        e.id AS id,
        e.nombre
    FROM especialidad e
""", nativeQuery = true)
    List<NombreEspecialidadesDTO> listarEspecialidades();


}