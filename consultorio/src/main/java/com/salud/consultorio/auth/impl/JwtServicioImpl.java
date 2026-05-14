package com.salud.consultorio.auth.impl;

import com.salud.consultorio.auth.service.IJwtServicio;
import com.salud.consultorio.model.entity.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtServicioImpl implements IJwtServicio {

    @Value("${aplication.security.jwt.secret}")
    private String secretKey;

    @Value("${aplication.security.jwt.expiration}")
    private Integer jwtExpiration;

    @Value("${aplication.security.jwt.refresh.expiration}")
    private Integer refreshExpiration;

    @Override
    public String generarToken(Usuario usuario) {
        return construirToken(usuario,jwtExpiration);
    }

    @Override
    public String generarTokenRefrescado(Usuario usuario) {
        return construirToken(usuario,refreshExpiration);
    }

    @Override
    public String construirToken(Usuario usuario, Integer expiration) {
        return Jwts.builder()
                .setId(usuario.getId().toString())
                .setClaims(Map.of("name",usuario.getUsuario()))
                .setSubject(usuario.getUsuario())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(getSignInKey())
                .compact();
    }

    public SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}