package com.salud.consultorio.configuracion;

import com.salud.consultorio.model.enums.DoctorEstado;
import com.salud.consultorio.model.enums.PacienteEstado;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class DoctorStringToEnumConverter implements Converter<String, DoctorEstado> {


    @Nullable
    @Override
    public DoctorEstado convert(String source) {
        return DoctorEstado.valueOf(source.toUpperCase());
    }
}
