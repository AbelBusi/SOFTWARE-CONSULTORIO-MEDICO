package com.salud.consultorio.repository;

import com.salud.consultorio.dto.paciente.PacienteActivoLeerDTO;
import com.salud.consultorio.dto.paciente.PacienteLeerDTO;
import com.salud.consultorio.dto.NombrePacientesDTO;
import com.salud.consultorio.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IPacienteRepositorio extends JpaRepository<Paciente,Integer> {

    @Query(value = """
                SELECT 
                    p.id AS idPaciente,
                    CONCAT(pe.nombre, ' ', pe.apellidos) AS nombrePaciente
                FROM paciente p
                INNER JOIN persona pe ON p.id_persona = pe.id
        """, nativeQuery = true)
    List<NombrePacientesDTO> listarPacientesResumen();

    @Query("""
    SELECT new com.salud.consultorio.dto.paciente.PacienteLeerDTO(
        p.id,
        pe.dni,
        pe.nombre,
        pe.apellidos,
        pe.fechaNacimiento,
        pe.genero,
        pe.telefono,
        pe.nacionalidad,
        pe.correo,
        p.entidadAseguradora,
        p.codigoAseguradora,
        p.estado
    )
    FROM Paciente p
    JOIN p.persona pe
    """)
    List<PacienteLeerDTO> leerPacientes();

    @Query("""
    SELECT new com.salud.consultorio.dto.paciente.PacienteLeerDTO(
        p.id,
        pe.dni,
        pe.nombre,
        pe.apellidos,
        pe.fechaNacimiento,
        pe.genero,
        pe.telefono,
        pe.nacionalidad,
        pe.correo,
        p.entidadAseguradora,
        p.codigoAseguradora,
        p.estado
    )
    FROM Paciente p
    JOIN p.persona pe
    WHERE p.id = :id
    """)
    Optional<PacienteLeerDTO> traerPacientePorId(@Param("id") Integer id);

    @Query("SELECT p FROM Paciente p JOIN FETCH p.persona WHERE p.id= :id")
    Optional<Paciente> findAlTPacientes(@Param("id") Integer id);

    @Query("SELECT p FROM Paciente p WHERE p.id = :id")
    Optional<Paciente> findByIdConPersona(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE Paciente p SET p.estado =:estado WHERE p.id=:id" )
    void PacienteCambiarEstado(@Param("estado")Integer estado, @Param("id") Integer id);

    @Query("""
    SELECT new com.salud.consultorio.dto.paciente.PacienteActivoLeerDTO(
        p.id,
        pe.dni,
        pe.nombre,
        pe.apellidos,
        pe.genero,
        p.entidadAseguradora,
        p.estado
    )
    FROM Paciente p
    JOIN p.persona pe
    WHERE p.estado=1
    """)
    List<PacienteActivoLeerDTO> leerPacientesActivos();

    @Query("""
    SELECT new com.salud.consultorio.dto.paciente.PacienteActivoLeerDTO(
        p.id,
        pe.dni,
        pe.nombre,
        pe.apellidos,
        pe.genero,
        p.entidadAseguradora,
        p.estado
    )
    FROM Paciente p
    JOIN p.persona pe
    WHERE p.estado=0
    """)
    List<PacienteActivoLeerDTO> leerPacientesInactivos();

}