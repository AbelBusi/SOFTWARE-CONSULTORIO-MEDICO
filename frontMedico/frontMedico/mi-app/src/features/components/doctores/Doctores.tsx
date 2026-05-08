import { useState } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    UserIcon,
    UserPlusIcon,
    CheckBadgeIcon,
    StarIcon,
} from "@heroicons/react/24/outline";
import DetalleDoctorModal from "./DetalleDoctorModal";

export interface Doctor {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    cmp: string;
    telefono: string;
    email: string;
    turno: "Mañana" | "Tarde" | "Noche" | "Completo";
    estado: "activo" | "inactivo";
    rating: number;
    pacientesAtendidos: number;
    diasAtencion: string[];
}

const MOCK_DOCTORES: Doctor[] = [
    { id: 1, nombre: "Ricardo", apellido: "Sánchez", especialidad: "Cardiología", cmp: "CMP-12345", telefono: "987 111 222", email: "r.sanchez@clinica.com", turno: "Mañana", estado: "activo", rating: 4.8, pacientesAtendidos: 342, diasAtencion: ["Lun", "Mié", "Vie"] },
    { id: 2, nombre: "Valentina", apellido: "Rojas", especialidad: "Pediatría", cmp: "CMP-23456", telefono: "976 222 333", email: "v.rojas@clinica.com", turno: "Tarde", estado: "activo", rating: 4.9, pacientesAtendidos: 518, diasAtencion: ["Lun", "Mar", "Jue", "Vie"] },
    { id: 3, nombre: "Marcos", apellido: "Vega", especialidad: "Traumatología", cmp: "CMP-34567", telefono: "965 333 444", email: "m.vega@clinica.com", turno: "Completo", estado: "activo", rating: 4.5, pacientesAtendidos: 210, diasAtencion: ["Mar", "Jue"] },
    { id: 4, nombre: "Patricia", apellido: "Llanos", especialidad: "Dermatología", cmp: "CMP-45678", telefono: "954 444 555", email: "p.llanos@clinica.com", turno: "Mañana", estado: "inactivo", rating: 4.3, pacientesAtendidos: 189, diasAtencion: ["Lun", "Mié"] },
    { id: 5, nombre: "Andrés", apellido: "Castillo", especialidad: "Neurología", cmp: "CMP-56789", telefono: "943 555 666", email: "a.castillo@clinica.com", turno: "Tarde", estado: "activo", rating: 4.7, pacientesAtendidos: 275, diasAtencion: ["Mar", "Mié", "Vie"] },
    { id: 6, nombre: "Camila", apellido: "Herrera", especialidad: "Ginecología", cmp: "CMP-67890", telefono: "932 666 777", email: "c.herrera@clinica.com", turno: "Mañana", estado: "activo", rating: 4.9, pacientesAtendidos: 430, diasAtencion: ["Lun", "Mar", "Mié", "Jue", "Vie"] },
];

const TURNO_COLORS: Record<string, string> = {
    "Mañana":   "bg-amber-50 text-amber-700 border-amber-200",
    "Tarde":    "bg-blue-50 text-blue-700 border-blue-200",
    "Noche":    "bg-purple-50 text-purple-700 border-purple-200",
    "Completo": "bg-green-50 text-green-700 border-green-200",
};

export default function Doctores() {
    const [search, setSearch] = useState("");
    const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
    const [sortField, setSortField] = useState<keyof Doctor>("apellido");
    const [sortAsc, setSortAsc] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const especialidades = [...new Set(MOCK_DOCTORES.map((d) => d.especialidad))].sort();

    const stats = [
        { title: "Total Doctores",   value: MOCK_DOCTORES.length,                                      icon: UserIcon,       color: "text-blue-600",   bg: "bg-blue-50" },
        { title: "Doctores Activos", value: MOCK_DOCTORES.filter((d) => d.estado === "activo").length, icon: CheckBadgeIcon, color: "text-green-600",  bg: "bg-green-50" },
        { title: "Nuevos (Mes)",     value: 1,                                                          icon: UserPlusIcon,   color: "text-purple-600", bg: "bg-purple-50" },
    ];

    const handleSort = (field: keyof Doctor) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    const filtered = MOCK_DOCTORES
        .filter((d) => {
            const matchSearch = `${d.nombre} ${d.apellido} ${d.cmp} ${d.especialidad}`.toLowerCase().includes(search.toLowerCase());
            const matchEsp = filtroEspecialidad ? d.especialidad === filtroEspecialidad : true;
            return matchSearch && matchEsp;
        })
        .sort((a, b) => {
            const av = String(a[sortField]).toLowerCase();
            const bv = String(b[sortField]).toLowerCase();
            return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
        });

    const SortHeader = ({ field, label }: { field: keyof Doctor; label: string }) => (
        <th
            className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 group"
            onClick={() => handleSort(field)}
        >
            <div className="flex items-center gap-1">
                {label}
                <ChevronUpDownIcon className={`h-3.5 w-3.5 transition-colors ${sortField === field ? "text-green-600" : "text-gray-300 group-hover:text-gray-400"}`} />
            </div>
        </th>
    );

    return (
        <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                        <div className={`p-3 rounded-lg ${item.bg}`}>
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{item.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-72 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <input
                            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                            placeholder="Buscar por nombre o CMP..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 shadow-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                        value={filtroEspecialidad}
                        onChange={(e) => setFiltroEspecialidad(e.target.value)}
                    >
                        <option value="">Todas las especialidades</option>
                        {especialidades.map((e) => <option key={e}>{e}</option>)}
                    </select>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-medium text-gray-600">{filtered.length}</span> doctores encontrados
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <SortHeader field="apellido" label="Doctor" />
                            <SortHeader field="especialidad" label="Especialidad" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CMP</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                            <SortHeader field="turno" label="Turno" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Días</th>
                            <SortHeader field="rating" label="Rating" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filtered.map((d) => {
                            const iniciales = `${d.nombre[0]}${d.apellido[0]}`.toUpperCase();
                            return (
                                <tr
                                    key={d.id}
                                    onClick={() => setSelectedDoctor(d)}
                                    className="hover:bg-green-50/50 cursor-pointer transition-colors group"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                                                <span className="text-green-700 text-xs font-bold">{iniciales}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-none">
                                                    Dr. {d.apellido}, {d.nombre}
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-1">{d.pacientesAtendidos} pacientes atendidos</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{d.especialidad}</td>
                                    <td className="px-4 py-4 font-mono text-xs text-gray-500">{d.cmp}</td>
                                    <td className="px-4 py-4">
                                        <p className="text-gray-700 font-medium">{d.telefono}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-[160px]">{d.email}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${TURNO_COLORS[d.turno]}`}>
                                                {d.turno}
                                            </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex gap-0.5 flex-wrap max-w-[110px]">
                                            {d.diasAtencion.map((dia) => (
                                                <span key={dia} className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                        {dia}
                                                    </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-1">
                                            <StarIcon className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-bold text-gray-700">{d.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                d.estado === "activo"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-gray-50 text-gray-500 border-gray-200"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${d.estado === "activo" ? "bg-green-500" : "bg-gray-400"}`} />
                                                {d.estado === "activo" ? "Activo" : "Inactivo"}
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-4 py-12 text-center text-gray-400 text-sm">
                                    No se encontraron doctores con ese criterio.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <DetalleDoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        </div>
    );
}