import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    UserGroupIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    InformationCircleIcon,
    ShieldCheckIcon,
    VideoCameraIcon
} from "@heroicons/react/24/outline";

/**
 * 1. COMPONENTES AUXILIARES
 */
const Field = ({ label, icon: Icon, error, children }: any) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 ml-1">
            {Icon && <Icon className="h-3 w-3" />}
            {label}
        </label>
        {children}
        {error && <span className="text-[10px] text-red-500 font-medium ml-1">{error}</span>}
    </div>
);

const PAISES = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "El Salvador", "España", "Estados Unidos", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana", "Uruguay", "Venezuela"];

interface FormData {
    motivo: string; fecha: string; horaInicio: string; horaSalida: string; costo: number; estado: number;
    recepcionista: { id: number }; doctor: { id: number }; especialidad: { id: number };
    paciente: {
        entidadAseguradora: string; codigoAseguradora: string; estado: number;
        persona: { dni: string; nombre: string; apellidos: string; fechaNacimiento: string; genero: string; telefono: string; nacionalidad: string; correo: string; estado: number; };
    };
}

const initialForm: FormData = {
    motivo: "", fecha: "", horaInicio: "", horaSalida: "", costo: 0, estado: 1,
    recepcionista: { id: 0 }, doctor: { id: 0 }, especialidad: { id: 0 },
    paciente: {
        entidadAseguradora: "", codigoAseguradora: "", estado: 1,
        persona: { dni: "", nombre: "", apellidos: "", fechaNacimiento: "", genero: "", telefono: "", nacionalidad: "", correo: "", estado: 1 },
    },
};

export default function CrearCita() {
    const [especialidades, setEspecialidades] = useState<any[]>([]);
    const [doctores, setDoctores] = useState<any[]>([]);
    const [recepcionistas, setRecepcionistas] = useState<any[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialForm);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resEsp, resDoc, resRec] = await Promise.all([
                    fetch("http://localhost:8088/api/v1/especialidades/resumen"),
                    fetch("http://localhost:8088/api/v1/doctores/resumen"),
                    fetch("http://localhost:8088/api/v1/recepcionistas/resumen"),
                ]);
                const [dEsp, dDoc, dRec] = await Promise.all([resEsp.json(), resDoc.json(), resRec.json()]);
                setEspecialidades(dEsp.object || []);
                setDoctores(dDoc.object || []);
                setRecepcionistas(dRec.object || []);
            } catch {
                Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los catálogos." });
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Limpiar error al escribir
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));

        if (["motivo", "fecha", "horaInicio", "horaSalida", "costo"].includes(name)) {
            setFormData(p => ({ ...p, [name]: name === "costo" ? Number(value) : value }));
        } else if (["entidadAseguradora", "codigoAseguradora"].includes(name)) {
            setFormData(p => ({ ...p, paciente: { ...p.paciente, [name]: value } }));
        } else {
            setFormData(p => ({
                ...p,
                paciente: { ...p.paciente, persona: { ...p.paciente.persona, [name]: value } },
            }));
        }
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
        setFormData(p => ({ ...p, [name]: { id: Number(value) } }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8088/api/v1/citas-medicas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                Swal.fire({ icon: "success", title: "¡Cita Registrada!", confirmButtonColor: "#15803d" });
                setFormData(initialForm);
                setErrors({});
            }
        } catch {
            Swal.fire({ icon: "error", title: "Error de servidor" });
        } finally { setLoading(false); }
    };

    const inputCls = (err?: string) =>
        `w-full bg-white border rounded-xl px-4 py-2.5 text-sm transition-all outline-none
        ${err ? "border-red-300 bg-red-50 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 hover:border-gray-300"}`;

    return (
        <div className="w-full px-6 pb-10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <div className="lg:col-span-3 space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Módulo de Citas</h2>
                                <p className="text-sm text-gray-400 font-medium">Gestión de agenda médica institucional.</p>
                            </div>
                            <CalendarIcon className="h-10 w-10 text-green-600/20" />
                        </div>

                        <div className="p-8 space-y-10">
                            {/* Sección Personal */}
                            <section>
                                <div className="text-green-700 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-6 border-l-4 border-green-600 pl-4">
                                    <UserGroupIcon className="h-4 w-4" /> 01. Asignación de Personal
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Field label="Recepcionista" error={errors.recepcionista}>
                                        <select name="recepcionista" value={formData.recepcionista.id} onChange={handleSelect} className={inputCls(errors.recepcionista)}>
                                            <option value={0}>Seleccionar...</option>
                                            {recepcionistas.map(r => <option key={r.idRecepcionista} value={r.idRecepcionista}>{r.nombreRecepcionista}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Doctor" error={errors.doctor}>
                                        <select name="doctor" value={formData.doctor.id} onChange={handleSelect} className={inputCls(errors.doctor)}>
                                            <option value={0}>Seleccionar...</option>
                                            {doctores.map(d => <option key={d.idDoctor} value={d.idDoctor}>{d.nombreDoctor}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Especialidad" error={errors.especialidad}>
                                        <select name="especialidad" value={formData.especialidad.id} onChange={handleSelect} className={inputCls(errors.especialidad)}>
                                            <option value={0}>Seleccionar...</option>
                                            {especialidades.map(e => <option key={e.idEspecialidad} value={e.idEspecialidad}>{e.nombreEspecialidad}</option>)}
                                        </select>
                                    </Field>
                                </div>
                            </section>

                            {/* Sección Paciente */}
                            <section>
                                <div className="text-green-700 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-6 border-l-4 border-green-600 pl-4">
                                    <UserIcon className="h-4 w-4" /> 02. Identificación del Paciente
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <Field label="DNI" error={errors.dni}><input name="dni" value={formData.paciente.persona.dni} onChange={handleChange} className={inputCls(errors.dni)} maxLength={8} /></Field>
                                    <Field label="Nombre"><input name="nombre" value={formData.paciente.persona.nombre} onChange={handleChange} className={inputCls()} /></Field>
                                    <Field label="Apellidos"><input name="apellidos" value={formData.paciente.persona.apellidos} onChange={handleChange} className={inputCls()} /></Field>
                                    <Field label="Nacionalidad">
                                        <select name="nacionalidad" value={formData.paciente.persona.nacionalidad} onChange={handleChange} className={inputCls()}>
                                            <option value="">Seleccionar...</option>
                                            {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </Field>
                                </div>
                            </section>

                            {/* Sección Seguro */}
                            <section>
                                <div className="text-green-700 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-6 border-l-4 border-green-600 pl-4">
                                    <ShieldCheckIcon className="h-4 w-4" /> 03. Información de Seguro
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Field label="Entidad Aseguradora"><input name="entidadAseguradora" value={formData.paciente.entidadAseguradora} onChange={handleChange} className={inputCls()} placeholder="Ej: EsSalud" /></Field>
                                    <Field label="Código de Seguro"><input name="codigoAseguradora" value={formData.paciente.codigoAseguradora} onChange={handleChange} className={inputCls()} /></Field>
                                </div>
                            </section>

                            {/* Sección Cita */}
                            <section>
                                <div className="text-green-700 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-6 border-l-4 border-green-600 pl-4">
                                    <ClipboardDocumentListIcon className="h-4 w-4" /> 04. Detalles de la Cita
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                    <Field label="Fecha" error={errors.fecha}><input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className={inputCls(errors.fecha)} /></Field>
                                    <Field label="Hora Inicio"><input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className={inputCls()} /></Field>
                                    <Field label="Hora Fin"><input type="time" name="horaSalida" value={formData.horaSalida} onChange={handleChange} className={inputCls()} /></Field>
                                    <Field label="Costo (S/.)" error={errors.costo}><input type="number" name="costo" value={formData.costo || ""} onChange={handleChange} className={inputCls(errors.costo)} /></Field>
                                </div>
                                <Field label="Motivo" error={errors.motivo}><input name="motivo" value={formData.motivo} onChange={handleChange} className={inputCls(errors.motivo)} placeholder="Ej: Control post-operatorio" /></Field>
                            </section>
                        </div>

                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button type="submit" disabled={loading} className="px-10 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl shadow-xl shadow-green-100 transition-all flex items-center gap-3">
                                {loading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <CheckCircleIcon className="h-6 w-6" />}
                                REGISTRAR CITA
                            </button>
                        </div>
                    </form>
                </div>

                {/* COLUMNA DERECHA: WIDGETS */}
                <div className="space-y-6">
                    {/* Tarjeta de Resumen */}
                    <div className="bg-green-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-8">Vista Previa</h3>
                            <div className="space-y-6">
                                <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-4">
                                    <ClockIcon className="h-6 w-6 text-green-300" />
                                    <div>
                                        <p className="text-[10px] uppercase opacity-60 font-bold">Fecha / Hora</p>
                                        <p className="text-sm font-medium">{formData.fecha || '--/--/--'} | {formData.horaInicio || '--:--'}</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl">
                                    <p className="text-[10px] uppercase opacity-60 font-bold mb-1">Total a Pagar</p>
                                    <p className="text-3xl font-black text-white">S/. {Number(formData.costo).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* CUADRO DEL VIDEO TUTORIAL (Marco vacío como CrearPaciente) */}
                    <div className="bg-white border border-gray-200 rounded-[2.5rem] p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-xs uppercase tracking-widest">
                            <VideoCameraIcon className="h-5 w-5 text-red-500" />
                            Video Tutorial
                        </div>
                        <div className="aspect-video w-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 group hover:border-green-300 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                                <ArrowPathIcon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Espacio para tutorial</span>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-2xl flex gap-3">
                            <InformationCircleIcon className="h-5 w-5 text-blue-500 shrink-0" />
                            <p className="text-[11px] text-blue-800 leading-tight italic">
                                Use este espacio para visualizar el video instructivo sobre la creación de citas.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}