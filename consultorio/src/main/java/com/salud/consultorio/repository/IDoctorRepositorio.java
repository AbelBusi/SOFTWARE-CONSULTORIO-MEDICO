package com.salud.consultorio.repository;

import com.salud.consultorio.dto.NombreDoctoresDTO;
import com.salud.consultorio.model.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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

}
