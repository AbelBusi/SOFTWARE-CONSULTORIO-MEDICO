import { useState, useEffect } from "react";
import {
    XMarkIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    CalendarDaysIcon,
    IdentificationIcon,
    HeartIcon,
    ClipboardDocumentListIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import EditarPacienteModal from "./EditarPacienteModal";

export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
    edad: number;
    sexo: string;
    telefono: string;
    email: string;
    direccion: string;
    seguro: string;
    grupoSanguineo: string;
    alergias: string[];
    ultimaCita: string;
    estado: "activo" | "inactivo";
}

interface Props {
    paciente: Paciente | null;
    onClose: () => void;
    onUpdate?: (updated: Paciente) => void;
}

export default function DetallePacienteModal({ paciente, onClose, onUpdate }: Props) {
    const [editando, setEditando] = useState(false);
    const [datos, setDatos] = useState<Paciente | null>(null);

    // Sync limpio con useEffect — nunca durante render
    useEffect(() => {
        setDatos(paciente);
        setEditando(false); // resetear estado edición al cambiar paciente
    }, [paciente]);

    // No renderizar nada si no hay paciente
    if (!paciente || !datos) return null;

    const iniciales = `${datos.nombre[0]}${datos.apellido[0]}`.toUpperCase();

    const handleSave = (updated: Paciente) => {
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
                                    {datos.nombre} {datos.apellido}
                                </h2>
                                <p className="text-green-200 text-sm mt-0.5">
                                    {datos.edad} años · {datos.sexo}
                                </p>
                                <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                                    datos.estado === "activo"
                                        ? "bg-green-500/30 text-green-100"
                                        : "bg-gray-400/30 text-gray-200"
                                }`}>
                                    {datos.estado === "activo" ? "Activo" : "Inactivo"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cards flotantes */}
                    <div className="px-6 -mt-5 grid grid-cols-3 gap-3">
                        {[
                            { label: "DNI", value: datos.dni, icon: IdentificationIcon },
                            { label: "Sangre", value: datos.grupoSanguineo, icon: HeartIcon },
                            { label: "Seguro", value: datos.seguro, icon: ClipboardDocumentListIcon },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-3 py-2.5 flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-400">{label}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Datos de contacto */}
                    <div className="px-6 py-5 space-y-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contacto</p>
                        <div className="space-y-2">
                            {[
                                { icon: PhoneIcon, value: datos.telefono },
                                { icon: EnvelopeIcon, value: datos.email },
                                { icon: MapPinIcon, value: datos.direccion },
                                { icon: CalendarDaysIcon, value: `Última cita: ${datos.ultimaCita}` },
                            ].map(({ icon: Icon, value }) => (
                                <div key={value} className="flex items-center gap-3 text-sm text-gray-600">
                                    <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>

                        {datos.alergias.length > 0 && (
                            <div className="pt-2">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Alergias</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {datos.alergias.map((a) => (
                                        <span key={a} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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
                            Editar paciente
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal editar — z-50, apilado encima */}
            {editando && (
                <EditarPacienteModal
                    paciente={datos}
                    onClose={() => setEditando(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}