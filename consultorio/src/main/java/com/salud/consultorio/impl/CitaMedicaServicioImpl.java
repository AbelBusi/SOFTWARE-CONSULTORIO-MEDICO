package com.salud.consultorio.impl;

import com.salud.consultorio.dto.citaMedica.*;
import com.salud.consultorio.model.entity.*;
import com.salud.consultorio.model.mapper.*;
import com.salud.consultorio.repository.*;
import com.salud.consultorio.service.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CitaMedicaServicioImpl implements ICitaMedicaServicio {

    private final ICitaMedicaRepositorio citaMedicaRepositorio;
    private final IDoctorServicio doctorServicio;
    private final IEspecialidadServicio especialidadServicio;
    private final IPacienteServicio pacienteServicio;
    private final IRecepcionistaServicio recepcionistaServicio;
    private final ReferenciaServicio referenciaServicio;
    private final ICitaMedicaMapper citaMedicaMapper;
    private final IPacienteMapper pacienteMapper;
    private final IPersonaMapper personaMapper;

    @Transactional(readOnly = true)
    @Override
    public List<CitaMedica> listarTodos() {
        return citaMedicaRepositorio.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<CitaMedica> obtenerPorId(Integer integer) {
        return citaMedicaRepositorio.findById(integer);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean cruceHorarios(LocalDate fecha, LocalTime horaSalida, LocalTime horaEntrada,Integer id) {
        return citaMedicaRepositorio.cruceHorasCitas(fecha,id,horaSalida,horaEntrada);
    }

    @Override
    public CitaMedica crear(CitaMedicaDTO dto) {
        return null;
    }

    @Transactional
    @Override
    public CitaMedicaRespuestaDTO crearCita(CitaMedicaCrearDTO dto) {

        if (!doctorServicio.existeDoctor(dto.getDoctor().getId())) {
            throw new EntityNotFoundException("El doctor no existe en la entidad");
        }

        if (!pacienteServicio.existePaciente(dto.getPaciente().getId())) {
            throw new EntityNotFoundException("El paciente no existe en la entidad");
        }

        if (!recepcionistaServicio.existeRecepcionista(dto.getRecepcionista().getId())) {
            throw new EntityNotFoundException("El recepcionista no existe en la entidad");
        }

        if (!especialidadServicio.existeEspecialidad(dto.getEspecialidad().getId())) {
            throw new EntityNotFoundException("La especialidad no existe en la entidad");
        }

        if (
                dto.getHoraInicio().isAfter(dto.getHoraSalida())
                        || dto.getHoraInicio().equals(dto.getHoraSalida())
        ) {
            throw new DataIntegrityViolationException(
                    "La hora de inicio debe ser menor a la hora de salida"
            );
        }

        if (
                citaMedicaRepositorio.cruceHorasCitas(
                        dto.getFecha(),
                        dto.getDoctor().getId(),
                        dto.getHoraSalida(),
                        dto.getHoraInicio()
                )
        ) {
            throw new DataIntegrityViolationException(
                    "Existe cruce de horario en la cita"
            );
        }

        CitaMedica citaMedica =
                citaMedicaMapper.citaMedicaCrearDtoToCitaMedica(dto);

        Especialidad especialidad =
                referenciaServicio.getRef(
                        Especialidad.class,
                        dto.getEspecialidad().getId()
                );

        Doctor doctor =
                referenciaServicio.getRef(
                        Doctor.class,
                        dto.getDoctor().getId()
                );

        Paciente paciente =
                referenciaServicio.getRef(
                        Paciente.class,
                        dto.getPaciente().getId()
                );

        Recepcionista recepcionista =
                referenciaServicio.getRef(
                        Recepcionista.class,
                        dto.getRecepcionista().getId()
                );

        citaMedica.setDoctor(doctor);
        citaMedica.setEspecialidad(especialidad);
        citaMedica.setRecepcionista(recepcionista);
        citaMedica.setPaciente(paciente);

        CitaMedica guardado = citaMedicaRepositorio.save(citaMedica);

        return citaMedicaMapper.toDto(guardado);
    }

    @Transactional
    @Override
    public CitaMedicaActualizarRespuestaDTO actualizar(CitaMedicaActualizarDTO citaMedicaActualizarDTO, Integer id) {

        CitaMedica citaMedica = obtenerPorId(id).orElseThrow(() ->
                new EntityNotFoundException("Cita Medica no existe"));

        citaMedicaMapper.updateFromDto(citaMedicaActualizarDTO,citaMedica);

        Doctor doctor = referenciaServicio.getRef(Doctor.class, citaMedicaActualizarDTO.getDoctor().getId());

        Especialidad especialidad = referenciaServicio.getRef(Especialidad.class, citaMedicaActualizarDTO.getEspecialidad().getId());

        Paciente paciente = referenciaServicio.getRef(Paciente.class, citaMedicaActualizarDTO.getPaciente().getId());

        Recepcionista recepcionista = referenciaServicio.getRef(Recepcionista.class, citaMedicaActualizarDTO.getRecepcionista().getId());

        citaMedica.setDoctor(doctor);
        citaMedica.setEspecialidad(especialidad);
        citaMedica.setPaciente(paciente);
        citaMedica.setRecepcionista(recepcionista);

        CitaMedica guardado = citaMedicaRepositorio.save(citaMedica);

        return citaMedicaMapper.tDto(guardado);

    }

    @Transactional
    @Override
    public void eliminarPorId(Integer id) {

        CitaMedica citaMedica = obtenerPorId(id).orElseThrow(
                () -> new EntityNotFoundException("No existe la cita medica")
        );

        citaMedicaRepositorio.CitaCambiarEstado(0,citaMedica.getId());

    }

    @Transactional(readOnly = true)
    @Override
    public CitaMedicaLeerDTO mostrarCitaMedicaPorId(Integer id) {
        return citaMedicaRepositorio.traerCitaMedicaId(id).orElseThrow(
                () -> new EntityNotFoundException("La cita medica no existe en la entidad")
        );
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaMedicaLeerDTO> leerCitasMedicas() {
        return citaMedicaRepositorio.leerCitasMedicas();
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaMedicaLeerDTO> leerCitasMedicasActivas() {
        return citaMedicaRepositorio.leerCitasMedicasActivas();
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaMedicaLeerDTO> leerCitasMedicasInactivas() {
        return citaMedicaRepositorio.leerCitasMedicasInactivas();
    }
}