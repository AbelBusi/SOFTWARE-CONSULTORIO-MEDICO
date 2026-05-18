import { useState } from "react";
import {
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    IdentificationIcon,
    ClockIcon,
    CheckCircleIcon,
    VideoCameraIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    AcademicCapIcon,
    BuildingOfficeIcon
} from "@heroicons/react/24/outline";

interface FormData {
    nombre: string; apellido: string; cmp: string; especialidad: string;
    telefono: string; email: string; turno: string; diasAtencion: string[];
    consultorio: string; observaciones: string; estado: string;
}

const INITIAL: FormData = {
    nombre: "", apellido: "", cmp: "", especialidad: "", telefono: "",
    email: "", turno: "", diasAtencion: [], consultorio: "", observaciones: "", estado: "activo",
};

const ESPECIALIDADES = [
    "Cardiología", "Dermatología", "Endocrinología", "Gastroenterología",
    "Ginecología", "Medicina General", "Neurología", "Oftalmología",
    "Pediatría", "Psiquiatría", "Traumatología", "Urología",
];

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function CrearDoctor() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning' | 'info', msg: string } | null>(null);

    const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all";
    const selectCls = `${inputCls} appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;

    const showAlert = (type: 'success' | 'error' | 'warning' | 'info', msg: string) => {
        setAlert({ type, msg });
        if (type === 'success' || type === 'info') {
            setTimeout(() => setAlert(null), 5000);
        }
    };

    const toggleDia = (dia: string) => {
        setForm((f) => ({
            ...f,
            diasAtencion: f.diasAtencion.includes(dia)
                ? f.diasAtencion.filter((d) => d !== dia)
                : [...f.diasAtencion, dia],
        }));
    };

    const handleConsultarCMP = () => {
        if (!form.cmp) {
            showAlert('warning', 'Ingrese un número de CMP para consultar.');
            return;
        }
        setLoading(true);
        // Simulación de consulta a base de datos de colegiado
        setTimeout(() => {
            setForm(prev => ({
                ...prev,
                nombre: "RICARDO MARIO",
                apellido: "PALMA SORIANO",
                especialidad: "Medicina General"
            }));
            showAlert('success', 'Médico encontrado y validado.');
            setLoading(false);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showAlert('success', 'Doctor registrado correctamente en el sistema.');
        setForm(INITIAL);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative max-w-[1440px] mx-auto">
            {/* ALERTAS FLOTANTES */}
            {alert && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-right-10 ${
                    alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                        alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                            alert.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                                'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                    {alert.type === 'success' && <CheckCircleIcon className="h-5 w-5" />}
                    {alert.type === 'error' && <ExclamationCircleIcon className="h-5 w-5" />}
                    {alert.type === 'warning' && <ExclamationTriangleIcon className="h-5 w-5" />}
                    {alert.type === 'info' && <InformationCircleIcon className="h-5 w-5" />}
                    <span className="text-sm font-medium">{alert.msg}</span>
                    <button onClick={() => setAlert(null)} className="ml-2 p-1 hover:bg-black/5 rounded-full">
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* VALIDACIÓN COLEGIO MÉDICO */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
                            <AcademicCapIcon className="h-5 w-5 text-green-600" />
                            Validación de Colegiatura (CMP)
                        </h3>
                        <div className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Número de Colegiatura</label>
                                <div className="relative">
                                    <input className={`${inputCls} pl-10`} placeholder="Ej: CMP-12345" value={form.cmp} onChange={(e) => setForm({...form, cmp: e.target.value})} required />
                                    <IdentificationIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                                </div>
                            </div>
                            <button type="button" onClick={handleConsultarCMP} disabled={loading} className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2">
                                {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                                Validar
                            </button>
                        </div>
                    </div>

                    {/* INFORMACIÓN PERSONAL Y CONTACTO */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <UserIcon className="h-5 w-5 text-green-600" />
                            Datos del Especialista
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Nombres</label>
                                <input className={inputCls} value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Apellidos</label>
                                <input className={inputCls} value={form.apellido} onChange={(e) => setForm({...form, apellido: e.target.value})} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <EnvelopeIcon className="inline h-3 w-3 mr-1" /> Correo Electrónico
                                </label>
                                <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="doctor@clinica.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <PhoneIcon className="inline h-3 w-3 mr-1" /> Teléfono
                                </label>
                                <input className={inputCls} value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} placeholder="999 999 999" required />
                            </div>
                        </div>
                    </div>

                    {/* ESPECIALIDAD Y CONSULTORIO */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
                            Ubicación y Especialidad
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Especialidad Médica</label>
                                <select className={selectCls} value={form.especialidad} onChange={(e) => setForm({...form, especialidad: e.target.value})} required>
                                    <option value="">Seleccionar especialidad...</option>
                                    {ESPECIALIDADES.map(esp => <option key={esp} value={esp}>{esp}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nro. Consultorio</label>
                                <input className={inputCls} value={form.consultorio} onChange={(e) => setForm({...form, consultorio: e.target.value})} placeholder="Ej: B-204" />
                            </div>
                        </div>
                    </div>

                    {/* HORARIOS */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <ClockIcon className="h-5 w-5 text-amber-500" />
                            Gestión de Horarios
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Turno Asignado</label>
                                <select className={selectCls} value={form.turno} onChange={(e) => setForm({...form, turno: e.target.value})} required>
                                    <option value="">Seleccionar turno...</option>
                                    <option value="mañana">Mañana (08:00 - 13:00)</option>
                                    <option value="tarde">Tarde (14:00 - 19:00)</option>
                                    <option value="completo">Completo</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Estado del Doctor</label>
                                <select className={selectCls} value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value})}>
                                    <option value="activo">Activo (Habilitado)</option>
                                    <option value="inactivo">Inactivo (De licencia)</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Días de Atención</label>
                            <div className="flex gap-2 flex-wrap pt-1">
                                {DIAS.map((dia) => {
                                    const active = form.diasAtencion.includes(dia);
                                    return (
                                        <button key={dia} type="button" onClick={() => toggleDia(dia)}
                                                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                                                    active ? "bg-green-700 text-white border-green-700 shadow-sm" : "bg-white text-gray-400 border-gray-200 hover:border-green-300"
                                                }`}
                                        >
                                            {dia}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Observaciones Adicionales</label>
                            <textarea className={`${inputCls} resize-none`} rows={3} value={form.observaciones} onChange={(e) => setForm({...form, observaciones: e.target.value})} placeholder="Notas sobre el especialista..." />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pb-8">
                        <button type="button" onClick={() => { setForm(INITIAL); showAlert('info', 'Formulario restablecido.'); }} className="px-6 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700">Limpiar</button>
                        <button type="submit" className="px-8 py-2.5 bg-green-700 text-white text-sm font-bold rounded-lg hover:bg-green-800 shadow-md transition-all active:scale-95">
                            Registrar Doctor
                        </button>
                    </div>
                </form>
            </div>

            {/* SIDEBAR DERECHO */}
            <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-6">
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <VideoCameraIcon className="h-5 w-5 text-blue-500" />
                        Tutorial del Módulo
                    </h4>
                    {/* CUADRO DEL VIDEO (MARCO VACÍO COMO CREARPACIENTE) */}
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="mt-5 space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                                <InformationCircleIcon className="h-3.5 w-3.5 inline mr-1" />
                                <b>Importante:</b> El CMP es validado contra la base de datos institucional para prevenir duplicados.
                            </p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Resumen de Registro</h5>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-gray-500">Doctor:</span>
                                    <span className="font-bold text-gray-700">{form.nombre ? `${form.nombre} ${form.apellido}` : '---'}</span>
                                </div>
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-gray-500">Especialidad:</span>
                                    <span className="font-bold text-blue-600">{form.especialidad || '---'}</span>
                                </div>
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-gray-500">Turno:</span>
                                    <span className="font-bold text-amber-600 uppercase">{form.turno || '---'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}