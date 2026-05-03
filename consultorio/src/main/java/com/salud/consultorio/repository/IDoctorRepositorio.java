package com.salud.consultorio.repository;

import com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO;
import com.salud.consultorio.dto.doctor.NombreDoctoresDTO;
import com.salud.consultorio.dto.paciente.PacienteActivoLeerDTO;
import com.salud.consultorio.model.entity.Doctor;
import com.salud.consultorio.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IDoctorRepositorio extends JpaRepository<Doctor, Integer> {


    @Query(value = """
    SELECT 
        d.id AS idDoctor,
        CONCAT(pe.nombre, ' ', pe.apellidos) AS nombreDoctor
    FROM doctor d
    INNER JOIN persona pe ON d.id_persona = pe.id
""", nativeQuery = true)
    List<NombreDoctoresDTO> listarDoctoresResumen();

    @Query("""
    SELECT new com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO(
        d.id,
        d.cpm,
        p.nombre,
        p.apellidos,
        e.nombre,
        p.genero,
        d.estado    
    )
    FROM Doctor d
    JOIN d.persona p
    JOIN d.especialidad e
    """)
    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidades();

    @Query("""
    SELECT new com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO(
        d.id,
        d.cpm,
        p.nombre,
        p.apellidos,
        e.nombre,
        p.genero,
        d.estado    
    )
    FROM Doctor d
    JOIN d.persona p
    JOIN d.especialidad e
    WHERE d.id=:id
    """)
    Optional<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadesPorId(@Param("id")Integer id);

    @Query("""
    SELECT new com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO(
        d.id,
        d.cpm,
        p.nombre,
        p.apellidos,
        e.nombre,
        p.genero,
        d.estado    
    )
    FROM Doctor d
    JOIN d.persona p
    JOIN d.especialidad e
    WHERE d.estado=1
    """)
    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadesActivos();

    @Query("""
    SELECT new com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO(
        d.id,
        d.cpm,
        p.nombre,
        p.apellidos,
        e.nombre,
        p.genero,
        d.estado    
    )
    FROM Doctor d
    JOIN d.persona p
    JOIN d.especialidad e
    WHERE d.estado=0
    """)
    List<DoctorEspecialidadLeerDTO> todosDoctoresEspecialidadesInactivos();

    @Query("SELECT d FROM Doctor d  JOIN FETCH d.persona JOIN FETCH d.especialidad WHERE d.id = :id")
    Optional<Doctor> findByIdConPersona(@Param("id") Integer id);

}
