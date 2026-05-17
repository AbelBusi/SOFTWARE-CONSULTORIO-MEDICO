import { useState } from "react";
import {
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    IdentificationIcon,
    HeartIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    VideoCameraIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

interface FormData {
    nombre: string; apellido: string; dni: string; fechaNacimiento: string;
    sexo: string; telefono: string; email: string; direccion: string;
    seguro: string; grupoSanguineo: string; alergias: string; observaciones: string;
}

const INITIAL: FormData = {
    nombre: "", apellido: "", dni: "", fechaNacimiento: "", sexo: "",
    telefono: "", email: "", direccion: "", seguro: "", grupoSanguineo: "",
    alergias: "", observaciones: "",
};

export default function CrearPaciente() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning' | 'info', msg: string } | null>(null);

    // Constantes de estilo corregidas y aplicadas
    const inputCls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all";
    const selectCls = `${inputCls} appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;

    const showAlert = (type: 'success' | 'error' | 'warning' | 'info', msg: string) => {
        setAlert({ type, msg });
        if (type === 'success' || type === 'info') {
            setTimeout(() => setAlert(null), 5000);
        }
    };

    const handleConsultarDNI = () => {
        if (form.dni.length !== 8) {
            showAlert('warning', 'El DNI debe tener 8 dígitos.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            if (form.dni === "12345678") {
                showAlert('error', 'El paciente ya existe en el sistema.');
                setLoading(false);
            } else {
                setForm(prev => ({
                    ...prev,
                    nombre: "CARLOS ALBERTO",
                    apellido: "RODRIGUEZ SOSA",
                    direccion: "CALLE LAS MAGNOLIAS 450, LIMA",
                    email: "c.rodriguez@email.com"
                }));
                showAlert('success', 'Datos cargados desde RENIEC.');
                setLoading(false);
            }
        }, 1200);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showAlert('success', 'Paciente registrado correctamente.');
        setForm(INITIAL);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
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
                    {/* BUSQUEDA DNI */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
                            <IdentificationIcon className="h-5 w-5 text-green-600" />
                            Validación RENIEC
                        </h3>
                        <div className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Número de DNI</label>
                                <div className="relative">
                                    <input className={`${inputCls} pl-10`} placeholder="8 dígitos" maxLength={8} value={form.dni} onChange={(e) => setForm({...form, dni: e.target.value})} required />
                                    <IdentificationIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                                </div>
                            </div>
                            <button type="button" onClick={handleConsultarDNI} disabled={loading} className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2">
                                {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                                Consultar
                            </button>
                        </div>
                    </div>

                    {/* DATOS PERSONALES */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <UserIcon className="h-5 w-5 text-green-600" />
                            Información del Paciente
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Nombres</label>
                                <input className={inputCls} value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Apellidos</label>
                                <input className={inputCls} value={form.apellido} onChange={(e) => setForm({...form, apellido: e.target.value})} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <EnvelopeIcon className="inline h-3 w-3 mr-1" /> Correo Electrónico
                                </label>
                                <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <PhoneIcon className="inline h-3 w-3 mr-1" /> Teléfono
                                </label>
                                <input className={inputCls} value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} placeholder="999 999 999" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <MapPinIcon className="inline h-3 w-3 mr-1" /> Dirección Residencial
                            </label>
                            <input className={inputCls} value={form.direccion} onChange={(e) => setForm({...form, direccion: e.target.value})} placeholder="Av. Siempre Viva 123..." />
                        </div>
                    </div>

                    {/* DATOS CLÍNICOS */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <HeartIcon className="h-5 w-5 text-red-500" />
                            Historial y Seguro
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <ShieldCheckIcon className="inline h-3 w-3 mr-1" /> Entidad Prestadora (Seguro)
                                </label>
                                <select className={selectCls} value={form.seguro} onChange={(e) => setForm({...form, seguro: e.target.value})}>
                                    <option value="">Particular (Sin Seguro)</option>
                                    <option value="sis">SIS</option>
                                    <option value="essalud">EsSalud</option>
                                    <option value="rimac">Rimac</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <HeartIcon className="inline h-3 w-3 mr-1" /> Grupo Sanguíneo
                                </label>
                                <select className={selectCls} value={form.grupoSanguineo} onChange={(e) => setForm({...form, grupoSanguineo: e.target.value})}>
                                    <option value="">No seleccionado</option>
                                    <option value="O+">O Rh+</option>
                                    <option value="O-">O Rh-</option>
                                    <option value="A+">A Rh+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button type="button" onClick={() => showAlert('info', 'Formulario restablecido.')} className="px-6 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700">Limpiar</button>
                        <button type="submit" className="px-8 py-2.5 bg-green-700 text-white text-sm font-bold rounded-lg hover:bg-green-800 shadow-md transition-all active:scale-95">
                            Registrar Paciente
                        </button>
                    </div>
                </form>
            </div>

            {/* SIDEBAR DERECHO */}
            <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <VideoCameraIcon className="h-5 w-5 text-blue-500" />
                        Tutorial de Registro
                    </h4>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-3 italic text-center">Aprenda a validar datos con RENIEC correctamente.</p>
                </div>
            </div>
        </div>
    );
}