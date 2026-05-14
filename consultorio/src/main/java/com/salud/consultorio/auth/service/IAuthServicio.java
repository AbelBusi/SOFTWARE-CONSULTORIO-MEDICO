package com.salud.consultorio.auth.service;

import com.salud.consultorio.auth.dto.TokenResponse;
import com.salud.consultorio.auth.dto.UsuarioCrearDTO;

public interface IAuthServicio {

    TokenResponse registrar (UsuarioCrearDTO dto);

}