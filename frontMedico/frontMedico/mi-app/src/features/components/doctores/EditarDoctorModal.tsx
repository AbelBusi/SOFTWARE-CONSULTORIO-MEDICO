import { useState, useEffect } from "react";
import {
    XMarkIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    IdentificationIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    PencilSquareIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { type Doctor } from "./Doctores";

interface Props {
    doctor: Doctor | null;
    onClose: () => void;
    onSave: (updated: Doctor) => void;
}

interface FieldProps {
    label: string;
    icon: React.ForwardRefExoticComponent<any>;
    children: React.ReactNode;
}

function Field({ label, icon: Icon, children }: FieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </label>
            {children}
        </div>
    );
}

const ESPECIALIDADES = [
    "Cardiología","Dermatología","Endocrinología","Gastroenterología",
    "Geriatría","Ginecología","Medicina General","Neurología",
    "Oftalmología","Oncología","Ortopedia","Otorrinolaringología",
    "Pediatría","Psiquiatría","Traumatología","Urología",
];

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const inputCls  = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition";
const selectCls = `${inputCls} appearance-none`;

export default function EditarDoctorModal({ doctor, onClose, onSave }: Props) {
    const [form, setForm] = useState<Doctor | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (doctor) {
            setForm({ ...doctor, diasAtencion: [...doctor.diasAtencion] });
            setSaved(false);
        }
    }, [doctor]);

    if (!doctor || !form) return null;

    const set = (field: keyof Doctor) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm((f) => f ? { ...f, [field]: e.target.value } : f);

    const toggleDia = (dia: string) => {
        setForm((f) => {
            if (!f) return f;
            const dias = f.diasAtencion.includes(dia)
                ? f.diasAtencion.filter((d) => d !== dia)
                : [...f.diasAtencion, dia];
            return { ...f, diasAtencion: dias };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;
        onSave(form);
        setSaved(true);
        setTimeout(() => { setSaved(false); onClose(); }, 1200);
    };

    const iniciales = `${form.nombre[0]}${form.apellido[0]}`.toUpperCase();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-green-700 px-6 pt-5 pb-5 flex items-center gap-4 shrink-0">
                    <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <span className="text-white text-base font-semibold">{iniciales}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <PencilSquareIcon className="h-4 w-4 text-green-300" />
                            <p className="text-green-200 text-xs font-medium uppercase tracking-widest">Editando</p>
                        </div>
                        <h2 className="text-white text-base font-semibold leading-tight truncate">
                            Dr. {form.nombre} {form.apellido}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-md text-green-200 hover:text-white hover:bg-green-600 transition-colors shrink-0"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Banner éxito */}
                {saved && (
                    <div className="flex items-center gap-2 bg-green-50 border-b border-green-200 text-green-700 px-6 py-3 text-sm font-medium shrink-0">
                        <CheckCircleIcon className="h-4 w-4 shrink-0" />
                        Cambios guardados correctamente.
                    </div>
                )}

                {/* Form scrollable */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                        {/* Datos personales */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-100">
                                Datos personales
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Nombre" icon={UserIcon}>
                                    <input className={inputCls} value={form.nombre} onChange={set("nombre")} required />
                                </Field>
                                <Field label="Apellido" icon={UserIcon}>
                                    <input className={inputCls} value={form.apellido} onChange={set("apellido")} required />
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="CMP" icon={IdentificationIcon}>
                                    <input className={inputCls} value={form.cmp} onChange={set("cmp")} required />
                                </Field>
                                <Field label="Estado" icon={ShieldCheckIcon}>
                                    <select className={selectCls} value={form.estado} onChange={set("estado")}>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                </Field>
                            </div>
                        </div>

                        {/* Especialidad */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-100">
                                Especialidad
                            </p>
                            <Field label="Especialidad" icon={ClipboardDocumentListIcon}>
                                <select className={selectCls} value={form.especialidad} onChange={set("especialidad")} required>
                                    {ESPECIALIDADES.map((e) => <option key={e}>{e}</option>)}
                                </select>
                            </Field>
                        </div>

                        {/* Contacto */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-100">
                                Contacto
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Teléfono" icon={PhoneIcon}>
                                    <input className={inputCls} value={form.telefono} onChange={set("telefono")} />
                                </Field>
                                <Field label="Email" icon={EnvelopeIcon}>
                                    <input type="email" className={inputCls} value={form.email} onChange={set("email")} />
                                </Field>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-100">
                                Horario
                            </p>
                            <Field label="Turno" icon={ClockIcon}>
                                <select className={selectCls} value={form.turno} onChange={set("turno")}>
                                    <option>Mañana</option>
                                    <option>Tarde</option>
                                    <option>Noche</option>
                                    <option>Completo</option>
                                </select>
                            </Field>
                            <Field label="Días de atención" icon={CalendarDaysIcon}>
                                <div className="flex gap-2 flex-wrap pt-0.5">
                                    {DIAS.map((dia) => {
                                        const active = form.diasAtencion.includes(dia);
                                        return (
                                            <button
                                                key={dia}
                                                type="button"
                                                onClick={() => toggleDia(dia)}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                                                    active
                                                        ? "bg-green-700 text-white border-green-700"
                                                        : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
                                                }`}
                                            >
                                                {dia}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Field>
                        </div>
                    </div>

                    {/* Footer fijo */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors shadow-sm"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}