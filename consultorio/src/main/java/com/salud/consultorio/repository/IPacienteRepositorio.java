package com.salud.consultorio.repository;

import com.salud.consultorio.model.dto.NombrePacientesDTO;
import com.salud.consultorio.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPacienteRepositorio extends JpaRepository<Paciente,Integer> {

    @Query(value = """
    SELECT 
        p.id AS idPaciente,
        CONCAT(pe.nombre, ' ', pe.apellidos) AS nombrePaciente
    FROM paciente p
    INNER JOIN persona pe ON p.id_persona = pe.id
""", nativeQuery = true)
    List<NombrePacientesDTO> listarPacientesResumen();

}
