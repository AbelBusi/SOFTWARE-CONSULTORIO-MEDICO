import { useState } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    TagIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    PlusIcon,
    EyeIcon,
    PencilIcon
} from "@heroicons/react/24/outline";

// Importación de los Modales
import VerDetalleEspecialidadModal from "./VerDetalleEspecialidadModal";
import CrearEspecialidadModal from "./CrearEspecialidadModal";
import EditarEspecialidadModal from "./EditarEspecialidadModal";

export interface Especialidad {
    id: number;
    nombre: string;
    descripcion: string;
    numDoctores: number;
    estado: "activo" | "inactivo";
    demanda: "Alta" | "Media" | "Baja";
    piso: string;
}

const MOCK_ESPECIALIDADES: Especialidad[] = [
    { id: 1, nombre: "Cardiología", descripcion: "Enfermedades del corazón y sistema circulatorio", numDoctores: 5, estado: "activo", demanda: "Alta", piso: "2do Piso" },
    { id: 2, nombre: "Pediatría", descripcion: "Atención médica para niños y adolescentes", numDoctores: 8, estado: "activo", demanda: "Alta", piso: "1er Piso" },
    { id: 3, nombre: "Dermatología", descripcion: "Cuidado de la piel, cabello y uñas", numDoctores: 3, estado: "activo", demanda: "Media", piso: "3er Piso" },
    { id: 4, nombre: "Ginecología", descripcion: "Salud del sistema reproductor femenino", numDoctores: 4, estado: "activo", demanda: "Media", piso: "2do Piso" },
    { id: 5, nombre: "Oftalmología", descripcion: "Tratamientos y cirugía ocular", numDoctores: 2, estado: "inactivo", demanda: "Baja", piso: "4to Piso" },
    { id: 6, nombre: "Neurología", descripcion: "Trastornos del sistema nervioso", numDoctores: 3, estado: "activo", demanda: "Alta", piso: "3er Piso" },
];

export default function Especialidades() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Especialidad>("nombre");
    const [sortAsc, setSortAsc] = useState(true);

    // Estados para los modales
    const [isCrearOpen, setIsCrearOpen] = useState(false);
    const [especialidadVer, setEspecialidadVer] = useState<Especialidad | null>(null);
    const [especialidadEditar, setEspecialidadEditar] = useState<Especialidad | null>(null);

    const stats = [
        {
            title: "Total Especialidades",
            value: MOCK_ESPECIALIDADES.length,
            icon: TagIcon,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Especialistas Activos",
            value: MOCK_ESPECIALIDADES.reduce((acc, curr) => acc + curr.numDoctores, 0),
            icon: UserGroupIcon,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Alta Demanda",
            value: MOCK_ESPECIALIDADES.filter(e => e.demanda === "Alta").length,
            icon: ArrowTrendingUpIcon,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
    ];

    const handleSort = (field: keyof Especialidad) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    const filtered = MOCK_ESPECIALIDADES
        .filter((e) =>
            `${e.nombre} ${e.piso}`.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const av = String(a[sortField]).toLowerCase();
            const bv = String(b[sortField]).toLowerCase();
            return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
        });

    const SortHeader = ({ field, label }: { field: keyof Especialidad; label: string }) => (
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
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:w-80 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                        className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                        placeholder="Buscar especialidad..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsCrearOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-green-200"
                >
                    <PlusIcon className="h-4 w-4" />
                    Nueva Especialidad
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <SortHeader field="nombre" label="Especialidad" />
                            <SortHeader field="piso" label="Ubicación" />
                            <SortHeader field="numDoctores" label="Especialistas" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Demanda</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filtered.map((e) => (
                            <tr key={e.id} className="hover:bg-green-50/50 transition-colors group">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                                            <TagIcon className="h-5 w-5 text-green-700" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-none">{e.nombre}</p>
                                            <p className="text-[11px] text-gray-400 mt-1 truncate max-w-[150px]">{e.descripcion}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-600 font-medium">{e.piso}</td>
                                <td className="px-4 py-4">
                                    <span className="font-bold text-gray-900">{e.numDoctores}</span>
                                    <span className="text-gray-400 text-[11px] ml-1">médicos</span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`text-xs font-semibold ${
                                        e.demanda === "Alta" ? "text-red-600" :
                                            e.demanda === "Media" ? "text-amber-600" : "text-blue-600"
                                    }`}>
                                        {e.demanda}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                                        e.estado === "activo" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"
                                    }`}>
                                        {e.estado === "activo" ? "Operativo" : "Mantenimiento"}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setEspecialidadVer(e)}
                                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-md transition-all"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setEspecialidadEditar(e)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-all"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Renderizado de Modales */}
            <CrearEspecialidadModal
                isOpen={isCrearOpen}
                onClose={() => setIsCrearOpen(false)}
            />

            <VerDetalleEspecialidadModal
                especialidad={especialidadVer}
                onClose={() => setEspecialidadVer(null)}
            />

            <EditarEspecialidadModal
                especialidad={especialidadEditar}
                isOpen={!!especialidadEditar}
                onClose={() => setEspecialidadEditar(null)}
            />
        </div>
    );
}