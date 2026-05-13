package com.salud.consultorio.impl;

import com.salud.consultorio.dto.usuario.UsuarioCrearDTO;
import com.salud.consultorio.dto.usuario.UsuarioRespuestaDTO;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.entity.Rol;
import com.salud.consultorio.model.entity.Usuario;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.model.mapper.IRolMapper;
import com.salud.consultorio.model.mapper.IUsuarioMapper;
import com.salud.consultorio.repository.IRolRepositorio;
import com.salud.consultorio.repository.IUsuarioRepositorio;
import com.salud.consultorio.service.IPersonaServicio;
import com.salud.consultorio.service.IRolServicio;
import com.salud.consultorio.service.IUsuarioServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServicioImpl implements IUsuarioServicio {

    private final IUsuarioRepositorio usuarioRepositorio;
    private final IRolServicio rolServicio;
    private final IPersonaServicio personaServicio;
    private final IUsuarioMapper usuarioMapper;
    private final IRolMapper rolMapper;
    private final IPersonaMapper personaMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UsuarioRespuestaDTO> leerTodos() {
        return List.of();
    }

    @Transactional
    @Override
    public UsuarioRespuestaDTO crear(UsuarioCrearDTO dto) {

        if (!rolServicio.existeRolId(dto.getId())){
            throw new EntityNotFoundException("No existe el rol en la entidad");
        }

        if (existeUsuario(dto.getUsuario())){
            throw new DataIntegrityViolationException("No se puede ingresar el usuario");
        }

        Usuario usuario = usuarioMapper.toEntity(dto);

        Persona persona = personaMapper.personaRefDtoToPersona(dto.getPersona());

        Rol rol = rolMapper.rolRefDtoToRol(dto.getRol());

        usuario.setClaveAcceso(passwordEncoder.encode(dto.getClaveAcceso()));
        usuario.setPersona(persona);
        usuario.setRol(rol);

        Usuario guardado = usuarioRepositorio.save(usuario);

        return usuarioMapper.toDto(guardado);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean existeUsuario(String usuario) {
        return usuarioRepositorio.existsByUsuario(usuario);
    }
}
