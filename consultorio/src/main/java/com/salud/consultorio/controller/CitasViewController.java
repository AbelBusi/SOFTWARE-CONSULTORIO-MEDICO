package com.salud.consultorio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class CitasViewController {

    // Simulación temporal (luego se conecta al backend real)
    private List<Map<String, Object>> listaCitas = new ArrayList<>();

    public CitasViewController() {
        // datos de prueba
        Map<String, Object> c1 = new HashMap<>();
        c1.put("id", 1);
        c1.put("paciente", "Juan Pérez");
        c1.put("doctor", "Dr. García");
        c1.put("fecha", "2026-04-22");

        listaCitas.add(c1);
    }

    // MOSTRAR CITAS
    @GetMapping("/citas")
    public String verCitas(Model model) {
        model.addAttribute("citas", listaCitas);
        return "citas";
    }

    // FORM CREAR
    @GetMapping("/citas/nueva")
    public String nuevaCita() {
        return "crear-citas";
    }

    // GUARDAR NUEVA CITA
    @PostMapping("/citas")
    public String guardarCita(
            @RequestParam String paciente,
            @RequestParam String doctor,
            @RequestParam String fecha) {

        Map<String, Object> nueva = new HashMap<>();
        nueva.put("id", listaCitas.size() + 1);
        nueva.put("paciente", paciente);
        nueva.put("doctor", doctor);
        nueva.put("fecha", fecha);

        listaCitas.add(nueva);

        return "redirect:/citas";
    }

    // FORM EDITAR
    @GetMapping("/citas/editar/{id}")
    public String editarCita(@PathVariable int id, Model model) {

        for (Map<String, Object> c : listaCitas) {
            if ((int) c.get("id") == id) {
                model.addAttribute("cita", c);
                break;
            }
        }

        return "editar-citas";
    }

    // ACTUALIZAR
    @PostMapping("/citas/editar/{id}")
    public String actualizarCita(
            @PathVariable int id,
            @RequestParam String paciente,
            @RequestParam String doctor,
            @RequestParam String fecha) {

        for (Map<String, Object> c : listaCitas) {
            if ((int) c.get("id") == id) {
                c.put("paciente", paciente);
                c.put("doctor", doctor);
                c.put("fecha", fecha);
            }
        }

        return "redirect:/citas";
    }
}