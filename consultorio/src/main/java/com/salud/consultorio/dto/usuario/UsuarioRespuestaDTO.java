package com.salud.consultorio.dto.usuario;

import com.salud.consultorio.dto.persona.PersonaRefDTO;
import com.salud.consultorio.dto.rol.RolRefDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class UsuarioRespuestaDTO {

    private Integer id;

    private PersonaRefDTO persona;

    private RolRefDTO rol;

    private String usuario;

    private String claveAcceso;

    private Integer estado;

}