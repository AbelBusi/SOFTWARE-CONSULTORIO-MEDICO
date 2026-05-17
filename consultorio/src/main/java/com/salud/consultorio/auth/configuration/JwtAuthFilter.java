package com.salud.consultorio.auth.configuration;

import com.salud.consultorio.auth.service.IJwtServicio;
import com.salud.consultorio.model.entity.Token;
import com.salud.consultorio.model.entity.Usuario;
import com.salud.consultorio.repository.ITokenRepositorio;
import com.salud.consultorio.repository.IUsuarioRepositorio;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final IJwtServicio jwtServicio;
    private final UserDetailsService userDetailsService;
    private final ITokenRepositorio tokenRepositorio;
    private final IUsuarioRepositorio usuarioRepositorio;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().contains("/auth")){

            filterChain.doFilter(request,response);

            return;

        }

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")){

            filterChain.doFilter(request,response);
            return;

        }

        final String jwtToken = authHeader.substring(7);
        final String usuario = jwtServicio.extraerUsuario(jwtToken);

        if (usuario == null || SecurityContextHolder.getContext().getAuthentication() != null){

            return;

        }

        final Token token = tokenRepositorio.findByToken(jwtToken).orElseThrow(
                ()-> new UsernameNotFoundException("Token Bearer vacio")
        );

        if (token == null || token.isExpired() || token.isRevoked()){

            filterChain.doFilter(request,response);
            return;

        }

        final UserDetails userDetails = this.userDetailsService.loadUserByUsername(usuario);
        final Optional<Usuario> user = usuarioRepositorio.findByUsuario(userDetails.getUsername());

        if (user.isEmpty()){
            filterChain.doFilter(request,response);
            return;
        }

        final boolean isTokenValidado = jwtServicio.tokenValido(jwtToken,user.get());

        if (!isTokenValidado){
            return;
        }

        final var authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request,response);

    }


}