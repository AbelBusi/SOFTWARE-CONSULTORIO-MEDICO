package com.salud.consultorio.repository;

import com.salud.consultorio.model.dto.NombreRecepcionistaDTO;
import com.salud.consultorio.model.entity.Recepcionista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRecepcionistaRepositorio extends JpaRepository<Recepcionista,Integer> {

    @Query(value = """
            SELECT 
                r.id AS idRecepcionista,
                CONCAT(p.nombre, ' ', p.apellidos) AS nombreRecepcionista
            FROM recepcionista r
            INNER JOIN persona p ON r.id_persona = p.id
                    """, nativeQuery = true)
    List<NombreRecepcionistaDTO> listarRecepcionistasNombres();

}