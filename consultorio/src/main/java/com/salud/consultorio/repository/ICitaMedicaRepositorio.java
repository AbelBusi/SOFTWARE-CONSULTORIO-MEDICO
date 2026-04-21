package com.salud.consultorio.repository;

import com.salud.consultorio.model.dto.LeerCitaMedicaDTO;
import com.salud.consultorio.model.entity.CitaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICitaMedicaRepositorio extends JpaRepository<CitaMedica,Integer> {

    @Query(value = """
            select c.id, p.nombre AS "nombrePaciente",
                   p.apellidos "apellidosPaciente",
                   c.motivo AS "motivoConsulta",
                   e.nombre AS "especialidad",
                   c.fecha AS "diaConsulta",
                   c.hora_inicio AS "horaInicio",
                   c.hora_salida AS "horaSalida",
                   pd.nombre AS "nombreDoctor",
                   c.estado AS "estado"
            from cita_medica c
                INNER JOIN especialidad e ON c.id_especialidad = e.id
                INNER JOIN paciente pa ON c.id_paciente = pa.id
                INNER JOIN persona p ON pa.id_persona = p.id
                INNER JOIN doctor d ON c.id_doctor = d.id
                INNER JOIN persona pd ON d.id_persona=pd.id; """,nativeQuery = true)
    List<LeerCitaMedicaDTO> leerCitasMedicas();

}