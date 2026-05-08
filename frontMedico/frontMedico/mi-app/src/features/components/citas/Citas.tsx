import { useEffect, useState } from "react";
import {
    ClipboardDocumentListIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    CalendarIcon,
    ClockIcon,
    AcademicCapIcon
} from "@heroicons/react/24/outline";

type CitaMedica = {
    id: number;
    nombrePaciente: string;
    apellidosPaciente: string;
    motivoConsulta: string;
    especialidad: string;
    diaConsulta: string;
    horaInicio: string;
    horaSalida: string;
    nombreDoctor: string;
    estado: number; // 0: Pendiente, 1: Completada
};

export default function Citas() {
    const [citas, setCitas] = useState<CitaMedica[]>([]);
    const [search, setSearch] = useState("");
    const [filterEstado, setFilterEstado] = useState<null | number>(null);
    const [sortField, setSortField] = useState<keyof CitaMedica>("diaConsulta");
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8088/api/v1/citas-medicas")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.object)) setCitas(data.object);
                else setCitas([]);
            })
            .catch((err) => console.error("Error cargando citas:", err));
    }, []);

    const handleSort = (field: keyof CitaMedica) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    const filteredCitas = citas
        .filter(c => {
            const matchSearch = `${c.nombrePaciente} ${c.apellidosPaciente} ${c.nombreDoctor} ${c.especialidad}`
                .toLowerCase().includes(search.toLowerCase());
            const matchEstado = filterEstado === null || c.estado === filterEstado;
            return matchSearch && matchEstado;
        })
        .sort((a, b) => {
            const av = String(a[sortField]).toLowerCase();
            const bv = String(b[sortField]).toLowerCase();
            return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
        });

    const stats = [
        { title: "Total Citas", value: citas.length, icon: ClipboardDocumentListIcon, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Pendientes", value: citas.filter(c => c.estado === 0).length, icon: ClockIcon, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Completadas", value: citas.filter(c => c.estado === 1).length, icon: HeartIcon, color: "text-green-600", bg: "bg-green-50" },
    ];

    const SortHeader = ({ field, label }: { field: keyof CitaMedica; label: string }) => (
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
            {/* Cards de Estadísticas */}
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

            {/* Toolbar: Búsqueda y Filtros */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:w-96 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                        className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                        placeholder="Buscar paciente, doctor o especialidad..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg shadow-inner shrink-0">
                    {[
                        { label: "Todos", val: null },
                        { label: "Pendientes", val: 0 },
                        { label: "Completadas", val: 1 }
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            onClick={() => setFilterEstado(btn.val)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                                filterEstado === btn.val
                                    ? "bg-white text-green-700 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabla de Citas Estilo Pacientes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <SortHeader field="apellidosPaciente" label="Paciente" />
                            <SortHeader field="especialidad" label="Especialidad / Motivo" />
                            <SortHeader field="diaConsulta" label="Fecha y Hora" />
                            <SortHeader field="nombreDoctor" label="Doctor" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filteredCitas.map((cita) => {
                            const iniciales = `${cita.nombrePaciente[0]}${cita.apellidosPaciente[0]}`.toUpperCase();
                            return (
                                <tr key={cita.id} className="hover:bg-green-50 transition-colors group">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 border border-green-200">
                                                <span className="text-green-700 text-xs font-bold">{iniciales}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-none">
                                                    {cita.apellidosPaciente}, {cita.nombrePaciente}
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tighter">ID: #{cita.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col">
                                                <span className="text-gray-700 font-medium flex items-center gap-1">
                                                    <AcademicCapIcon className="h-3.5 w-3.5 text-gray-400" />
                                                    {cita.especialidad}
                                                </span>
                                            <span className="text-xs text-gray-400 truncate max-w-[200px]">{cita.motivoConsulta}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col text-gray-600">
                                            <div className="flex items-center gap-1 font-medium">
                                                <CalendarIcon className="h-3.5 w-3.5 text-green-600" />
                                                {new Date(cita.diaConsulta).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <ClockIcon className="h-3.5 w-3.5" />
                                                {cita.horaInicio} - {cita.horaSalida}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                            <span className="font-medium">Dr. {cita.nombreDoctor}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right md:text-left">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                cita.estado === 1
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${cita.estado === 1 ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                                                {cita.estado === 1 ? "Completada" : "Pendiente"}
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredCitas.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-16 text-center text-gray-400">
                                    <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">No se encontraron citas programadas.</p>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
