package com.salud.consultorio.configuracion;

import com.salud.consultorio.model.enums.PacienteEstado;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class PacienteStringToEnumConverter implements Converter<String,PacienteEstado> {


    @Nullable
    @Override
    public PacienteEstado convert(String source) {
        return PacienteEstado.valueOf(source.toUpperCase());
    }
}
