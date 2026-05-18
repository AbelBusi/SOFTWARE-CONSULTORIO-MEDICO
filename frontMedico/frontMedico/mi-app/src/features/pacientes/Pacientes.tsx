import { useState } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    UserGroupIcon,
    UserPlusIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/outline";
import DetallePacienteModal, { type Paciente } from "./DetallePacienteModal.tsx";

const MOCK_PACIENTES: Paciente[] = [
    { id: 1, nombre: "María", apellido: "García", dni: "12345678", fechaNacimiento: "1985-03-12", edad: 39, sexo: "Femenino", telefono: "987 654 321", email: "maria.garcia@email.com", direccion: "Av. Larco 450, Miraflores", seguro: "SIS", grupoSanguineo: "O+", alergias: ["Penicilina"], ultimaCita: "15 abr 2026", estado: "activo" },
    { id: 2, nombre: "Carlos", apellido: "Mendoza", dni: "87654321", fechaNacimiento: "1990-07-22", edad: 34, sexo: "Masculino", telefono: "976 543 210", email: "c.mendoza@email.com", direccion: "Jr. Unión 123, Lima", seguro: "EsSalud", grupoSanguineo: "A+", alergias: [], ultimaCita: "02 abr 2026", estado: "activo" },
    { id: 3, nombre: "Ana", apellido: "Torres", dni: "45678912", fechaNacimiento: "1978-11-05", edad: 46, sexo: "Femenino", telefono: "965 432 109", email: "ana.torres@email.com", direccion: "Calle Las Flores 89, San Isidro", seguro: "Rimac", grupoSanguineo: "B-", alergias: ["Aspirina", "Ibuprofeno"], ultimaCita: "28 mar 2026", estado: "activo" },
    { id: 4, nombre: "Luis", apellido: "Ramírez", dni: "32165498", fechaNacimiento: "2000-01-30", edad: 25, sexo: "Masculino", telefono: "954 321 098", email: "luis.ramirez@email.com", direccion: "Av. Brasil 77, Breña", seguro: "Pacífico", grupoSanguineo: "AB+", alergias: ["Látex"], ultimaCita: "10 mar 2026", estado: "inactivo" },
    { id: 5, nombre: "Sofía", apellido: "Chávez", dni: "65498732", fechaNacimiento: "1995-06-18", edad: 29, sexo: "Femenino", telefono: "943 210 987", email: "sofia.chavez@email.com", direccion: "Calle Lima 200, Surco", seguro: "SIS", grupoSanguineo: "O-", alergias: [], ultimaCita: "20 abr 2026", estado: "activo" },
    { id: 6, nombre: "Roberto", apellido: "Flores", dni: "11223344", fechaNacimiento: "1965-09-14", edad: 59, sexo: "Masculino", telefono: "932 109 876", email: "r.flores@email.com", direccion: "Jr. Puno 55, Cercado", seguro: "EsSalud", grupoSanguineo: "A-", alergias: ["Sulfa"], ultimaCita: "05 abr 2026", estado: "activo" },
];

export default function Pacientes() {
    const [search, setSearch] = useState("");
    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [sortField, setSortField] = useState<keyof Paciente>("apellido");
    const [sortAsc, setSortAsc] = useState(true);

    // Estadísticas
    const stats = [
        {
            title: "Total Pacientes",
            value: MOCK_PACIENTES.length,
            icon: UserGroupIcon,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Pacientes Activos",
            value: MOCK_PACIENTES.filter(p => p.estado === "activo").length,
            icon: CheckBadgeIcon,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Nuevos (Mes)",
            value: 2, // Dato de ejemplo
            icon: UserPlusIcon,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
    ];

    const handleSort = (field: keyof Paciente) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    const filtered = MOCK_PACIENTES
        .filter((p) =>
            `${p.nombre} ${p.apellido} ${p.dni}`.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const av = String(a[sortField]).toLowerCase();
            const bv = String(b[sortField]).toLowerCase();
            return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
        });

    const SortHeader = ({ field, label }: { field: keyof Paciente; label: string }) => (
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
            {/* Estadísticas (Igual que en Citas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
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
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:w-80 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                        className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                        placeholder="Buscar por nombre o DNI..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-medium text-gray-600">{filtered.length}</span> pacientes encontrados
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <SortHeader field="apellido" label="Paciente" />
                            <SortHeader field="dni" label="DNI" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacto</th>
                            <SortHeader field="seguro" label="Seguro" />
                            <SortHeader field="ultimaCita" label="Última cita" />
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filtered.map((p) => {
                            const iniciales = `${p.nombre[0]}${p.apellido[0]}`.toUpperCase();
                            return (
                                <tr
                                    key={p.id}
                                    onClick={() => setSelectedPaciente(p)}
                                    className="hover:bg-green-50/50 cursor-pointer transition-colors group"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                                                <span className="text-green-700 text-xs font-bold">{iniciales}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-none">
                                                    {p.apellido}, {p.nombre}
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-1">{p.edad} años · {p.sexo}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">{p.dni}</td>
                                    <td className="px-4 py-4">
                                        <p className="text-gray-700 font-medium">{p.telefono}</p>
                                        <p className="text-xs text-gray-400 truncate max-w-[160px]">{p.email}</p>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{p.seguro}</td>
                                    <td className="px-4 py-4 text-gray-500">{p.ultimaCita}</td>
                                    <td className="px-4 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                p.estado === "activo"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-gray-50 text-gray-500 border-gray-200"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${p.estado === "activo" ? "bg-green-500" : "bg-gray-400"}`} />
                                                {p.estado === "activo" ? "Activo" : "Inactivo"}
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <DetallePacienteModal paciente={selectedPaciente} onClose={() => setSelectedPaciente(null)} />
        </div>
    );
}