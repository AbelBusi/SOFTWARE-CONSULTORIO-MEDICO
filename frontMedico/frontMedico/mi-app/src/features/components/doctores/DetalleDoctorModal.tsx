import { useState, useEffect } from "react";
import {
    XMarkIcon,
    PhoneIcon,
    EnvelopeIcon,
    CalendarDaysIcon,
    IdentificationIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    StarIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import EditarDoctorModal from "./EditarDoctorModal";
import { type Doctor } from "./Doctores";

interface Props {
    doctor: Doctor | null;
    onClose: () => void;
    onUpdate?: (updated: Doctor) => void;
}

const TURNO_COLORS: Record<string, string> = {
    "Mañana":   "bg-amber-500/30 text-amber-100",
    "Tarde":    "bg-blue-500/30 text-blue-100",
    "Noche":    "bg-purple-500/30 text-purple-100",
    "Completo": "bg-green-500/30 text-green-100",
};

export default function DetalleDoctorModal({ doctor, onClose, onUpdate }: Props) {
    const [editando, setEditando] = useState(false);
    const [datos, setDatos] = useState<Doctor | null>(null);

    useEffect(() => {
        setDatos(doctor);
        setEditando(false);
    }, [doctor]);

    if (!doctor || !datos) return null;

    const iniciales = `${datos.nombre[0]}${datos.apellido[0]}`.toUpperCase();

    const handleSave = (updated: Doctor) => {
        setDatos(updated);
        onUpdate?.(updated);
        setEditando(false);
    };

    return (
        <>
            {/* Backdrop detalle — z-40 */}
            <div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header verde */}
                    <div className="bg-green-700 px-6 pt-6 pb-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-md text-green-200 hover:text-white hover:bg-green-600 transition-colors"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <span className="text-white text-xl font-semibold">{iniciales}</span>
                            </div>
                            <div>
                                <h2 className="text-white text-lg font-semibold leading-tight">
                                    Dr. {datos.nombre} {datos.apellido}
                                </h2>
                                <p className="text-green-200 text-sm mt-0.5">
                                    {datos.especialidad} · {datos.cmp}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${TURNO_COLORS[datos.turno] ?? "bg-white/20 text-white"}`}>
                                        {datos.turno}
                                    </span>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                        datos.estado === "activo"
                                            ? "bg-green-500/30 text-green-100"
                                            : "bg-gray-400/30 text-gray-200"
                                    }`}>
                                        {datos.estado === "activo" ? "Activo" : "Inactivo"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards flotantes */}
                    <div className="px-6 -mt-5 grid grid-cols-3 gap-3">
                        {[
                            { label: "CMP",       value: datos.cmp,                          icon: IdentificationIcon,      star: false },
                            { label: "Rating",    value: datos.rating.toString(),             icon: StarIcon,                star: true  },
                            { label: "Pacientes", value: datos.pacientesAtendidos.toString(), icon: ClipboardDocumentListIcon, star: false },
                        ].map(({ label, value, icon: Icon, star }) => (
                            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-3 py-2.5 flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-400">{label}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 truncate flex items-center gap-1">
                                    {star && <StarIcon className="h-3 w-3 text-amber-400 fill-amber-400 inline shrink-0" />}
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Datos */}
                    <div className="px-6 py-5 space-y-4">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contacto</p>
                            {[
                                { icon: PhoneIcon,   value: datos.telefono },
                                { icon: EnvelopeIcon, value: datos.email },
                            ].map(({ icon: Icon, value }) => (
                                <div key={value} className="flex items-center gap-3 text-sm text-gray-600">
                                    <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Horario</p>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ClockIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                <span>Turno {datos.turno}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-gray-600">
                                <CalendarDaysIcon className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                                <div className="flex gap-1 flex-wrap">
                                    {datos.diasAtencion.map((dia) => (
                                        <span key={dia} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                            {dia}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-5 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditando(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
                        >
                            <PencilSquareIcon className="h-4 w-4" />
                            Editar doctor
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal editar — z-50 */}
            {editando && (
                <EditarDoctorModal
                    doctor={datos}
                    onClose={() => setEditando(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}