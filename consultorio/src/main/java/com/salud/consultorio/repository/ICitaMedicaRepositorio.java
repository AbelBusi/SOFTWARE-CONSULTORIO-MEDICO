package com.salud.consultorio.repository;

import com.salud.consultorio.dto.citaMedica.CitaMedicaLeerDTO;
import com.salud.consultorio.dto.doctor.DoctorEspecialidadLeerDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICitaMedicaRepositorio extends JpaRepository<CitaMedica,Integer> {

    @Query("""
    SELECT NEW com.salud.consultorio.dto.citaMedica.CitaMedicaLeerDTO(
           c.id, 
           p.nombre,
           p.apellidos,
           c.motivo,
           e.nombre,
           c.fecha,
           c.horaInicio,
           c.horaSalida,
           pd.nombre,
           c.estado    
    )
    FROM CitaMedica c
    JOIN c.especialidad e
    JOIN c.paciente pa
    JOIN pa.persona p
    JOIN c.doctor d
    JOIN d.persona pd
    """)
    List<CitaMedicaLeerDTO> leerCitasMedicas();

    @Query("""
    SELECT NEW com.salud.consultorio.dto.citaMedica.CitaMedicaLeerDTO(
           c.id, 
           p.nombre,
           p.apellidos,
           c.motivo,
           e.nombre,
           c.fecha,
           c.horaInicio,
           c.horaSalida,
           pd.nombre,
           c.estado    
    )
    FROM CitaMedica c
    JOIN c.especialidad e
    JOIN c.paciente pa
    JOIN pa.persona p
    JOIN c.doctor d
    JOIN d.persona pd
    WHERE c.estado=1
    """)
    List<CitaMedicaLeerDTO> leerCitasMedicasActivas();

    @Query("""
    SELECT NEW com.salud.consultorio.dto.citaMedica.CitaMedicaLeerDTO(
           c.id, 
           p.nombre,
           p.apellidos,
           c.motivo,
           e.nombre,
           c.fecha,
           c.horaInicio,
           c.horaSalida,
           pd.nombre,
           c.estado    
    )
    FROM CitaMedica c
    JOIN c.especialidad e
    JOIN c.paciente pa
    JOIN pa.persona p
    JOIN c.doctor d
    JOIN d.persona pd
    WHERE c.estado=0
    """)
    List<CitaMedicaLeerDTO> leerCitasMedicasInactivas();

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
    SELECT NEW com.salud.consultorio.dto.citaMedica.CitaMedicaLeerDTO(
           c.id, 
           p.nombre,
           p.apellidos,
           c.motivo,
           e.nombre,
           c.fecha,
           c.horaInicio,
           c.horaSalida,
           pd.nombre,
           c.estado    
    )
    FROM CitaMedica c
    JOIN c.especialidad e
    JOIN c.paciente pa
    JOIN pa.persona p
    JOIN c.doctor d
    JOIN d.persona pd
    WHERE c.id = :id
    """)
    Optional<CitaMedicaLeerDTO> traerCitaMedicaId(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE CitaMedica c SET c.estado =:estado WHERE c.id=:id" )
    void CitaCambiarEstado(@Param("estado")Integer estado, @Param("id") Integer id);

}