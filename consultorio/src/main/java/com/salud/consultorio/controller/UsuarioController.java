package com.salud.consultorio.controller;

import com.salud.consultorio.model.payload.MensajeResponse;
import com.salud.consultorio.service.IUsuarioServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/usuarios")
@RequiredArgsConstructor
@Tag(
        name = "Usuarios",
        description = "Endpoints para la gestión de usuarios del sistema"
)
public class UsuarioController {

    private final IUsuarioServicio usuarioServicio;

    @GetMapping("/{id}/rol")
    @Operation(
            summary = "Obtener nombre completo y rol de un usuario",
            description = "Devuelve el nombre completo y el rol en mayúsculas envueltos en un MensajeResponse."
    )
    @ApiResponse(responseCode = "200", description = "Usuario encontrado con éxito")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    public ResponseEntity<MensajeResponse> obtenerUsuarioYRolPorId(@PathVariable Integer id) {
        return usuarioServicio.obtenerInformacionUsuarioYRol(id)
                .map(dto -> ResponseEntity.ok(
                        MensajeResponse.builder()
                                .mensaje("Información del usuario obtenida correctamente.")
                                .object(dto)
                                .build()
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        MensajeResponse.builder()
                                .mensaje("El usuario con el ID proporcionado no existe.")
                                .object(null)
                                .build()
                ));
    }
}