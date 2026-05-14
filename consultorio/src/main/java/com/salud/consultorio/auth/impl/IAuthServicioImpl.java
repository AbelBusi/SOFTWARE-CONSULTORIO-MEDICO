package com.salud.consultorio.auth.impl;

import com.salud.consultorio.auth.dto.TokenResponse;
import com.salud.consultorio.auth.dto.UsuarioCrearDTO;
import com.salud.consultorio.auth.service.IAuthServicio;
import com.salud.consultorio.auth.service.IJwtServicio;
import com.salud.consultorio.model.entity.Persona;
import com.salud.consultorio.model.entity.Rol;
import com.salud.consultorio.model.entity.Token;
import com.salud.consultorio.model.entity.Usuario;
import com.salud.consultorio.model.mapper.IPersonaMapper;
import com.salud.consultorio.model.mapper.IRolMapper;
import com.salud.consultorio.model.mapper.IUsuarioMapper;
import com.salud.consultorio.repository.ITokenRepositorio;
import com.salud.consultorio.repository.IUsuarioRepositorio;
import com.salud.consultorio.service.IRolServicio;
import com.salud.consultorio.service.IUsuarioServicio;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IAuthServicioImpl implements IAuthServicio {

    private final IUsuarioRepositorio usuarioRepositorio;
    private final ITokenRepositorio tokenRepositorio;
    private final IUsuarioServicio usuarioServicio;
    private final IJwtServicio jwtServicio;
    private final IRolServicio rolServicio;
    private final IUsuarioMapper usuarioMapper;
    private final IPersonaMapper personaMapper;
    private final IRolMapper rolMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public TokenResponse registrar(UsuarioCrearDTO dto) {

        if (!rolServicio.existeRolId(dto.getRol().getId())){
            throw new EntityNotFoundException("No existe el rol en la entidad");
        }

        if (usuarioServicio.existeUsuario(dto.getUsuario())){
            throw new DataIntegrityViolationException("No se puede guardar al usuario");
        }

        if (usuarioServicio.existeUsuarioPersona(dto.getPersona().getId())){
            throw new DataIntegrityViolationException("El usurio ya se encuentra anteriormente en el sistema");
        }

        Usuario usuario = usuarioMapper.toEntity(dto);

        Persona persona = personaMapper.personaRefDtoToPersona(dto.getPersona());

        Rol rol = rolMapper.rolRefDtoToRol(dto.getRol());

        usuario.setClaveAcceso(passwordEncoder.encode(dto.getClaveAcceso()));
        usuario.setPersona(persona);
        usuario.setRol(rol);

        Usuario guardado = usuarioRepositorio.save(usuario);
        String jwtToken = jwtServicio.generarToken(usuario);
        String refreshToken = jwtServicio.generarTokenRefrescado(usuario);

        saveUserToken(guardado,jwtToken);

        return new TokenResponse(jwtToken,refreshToken);
    }

    private void saveUserToken(Usuario usuario, String jwtToken){

        Token token = Token.builder()
                .usuario(usuario)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepositorio.save(token);

    }

}