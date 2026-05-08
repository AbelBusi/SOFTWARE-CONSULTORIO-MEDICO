import { useState } from "react";
import {
    Bars3Icon,
    CalendarDaysIcon,
    UserGroupIcon,
    UserIcon,
    TagIcon,
    PlusIcon,
    ListBulletIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    BellIcon,
    Cog6ToothIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Citas from "../components/citas/Citas.tsx";
import CrearCita from "../components/citas/CrearCita.tsx";
import Pacientes from "../components/pacientes/Pacientes.tsx";
import CrearPaciente from "../components/pacientes/CrearPaciente.tsx";
import Doctores from "../components/doctores/Doctores.tsx";
import CrearDoctor from "../components/doctores/CrearDoctor.tsx";
import Especialistas from "../components/especialidades/Especialidades.tsx";
interface SubNavItem { id: string; label: string; icon: React.ForwardRefExoticComponent<any>; }
interface NavItem { id: string; label: string; icon: React.ForwardRefExoticComponent<any>; sub?: SubNavItem[]; }

const navItems: NavItem[] = [
    {
        id: "Citas",
        label: "Citas",
        icon: CalendarDaysIcon,
        sub: [
            { id: "VerCitas", label: "Ver citas", icon: ListBulletIcon },
            { id: "CrearCita", label: "Nueva cita", icon: PlusIcon },
        ],
    },
    {
        id: "Pacientes",
        label: "Pacientes",
        icon: UserGroupIcon,
        sub: [
            { id: "VerPacientes", label: "Ver pacientes", icon: ListBulletIcon },
            { id: "CrearPaciente", label: "Nuevo paciente", icon: PlusIcon },
        ],
    },
    {
        id: "Doctores",
        label: "Doctores",
        icon: UserIcon,
        sub: [
            { id: "VerDoctores", label: "Ver doctores", icon: ListBulletIcon },
            { id: "CrearDoctor", label: "Agregar doctor", icon: PlusIcon },
        ],
    },
    {
        id: "Especialidades",
        label: "Especialidades",
        icon: TagIcon,
        sub: [
            { id: "VerEspecialidades", label: "Ver especialidades", icon: ListBulletIcon },
        ]
    },
];

export default function Dashboard() {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState<string>("Citas");
    const [subSelected, setSubSelected] = useState<string>("VerCitas");
    const [expandedItem, setExpandedItem] = useState<string | null>("Citas");

    const handleNavClick = (item: NavItem) => {
        setSelected(item.id);
        if (item.sub) {
            setExpandedItem(expandedItem === item.id ? null : item.id);
            // Al hacer click en el padre, selecciona el primer hijo por defecto
            setSubSelected(item.sub[0].id);
        } else {
            setExpandedItem(null);
        }
    };

    const currentLabel = navItems.find((n) => n.id === selected)?.label ?? selected;
    const currentSub = navItems.find((n) => n.id === selected)?.sub?.find((s) => s.id === subSelected)?.label ?? "";

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* SIDEBAR */}
            <aside className={`${open ? "w-60" : "w-16"} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 shrink-0`}>

                <div className={`flex items-center ${open ? "justify-between px-5" : "justify-center"} h-16 border-b border-gray-200 mb-4`}>
                    {open && (
                        <span className="text-green-700 font-semibold text-base tracking-tight leading-none">
                            Clínica<span className="text-gray-400 font-normal">Pro</span>
                        </span>
                    )}
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                </div>

                {/* Perfil */}
                <div className="px-3 mb-4">
                    <div className={`flex flex-col items-center py-4 rounded-xl ${open ? "bg-gray-50 border border-gray-100" : "bg-transparent"}`}>
                        <div className="relative">
                            <div className={`${open ? "w-14 h-14" : "w-10 h-10"} rounded-full bg-green-700 flex items-center justify-center text-white font-bold transition-all`}>
                                <span>JP</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        {open && (
                            <div className="mt-3 text-center">
                                <p className="text-sm font-bold text-gray-800 leading-none">Juan Pérez</p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase mt-1.5">Administrador</p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 py-3 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = selected === item.id;
                        const isExpanded = expandedItem === item.id;

                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => handleNavClick(item)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors group
                                        ${isActive ? "text-green-700 bg-green-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                                        ${!open && "justify-center px-0"}
                                    `}
                                >
                                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-green-700" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {open && <span className="flex-1 text-left font-medium">{item.label}</span>}
                                    {open && item.sub && (isExpanded
                                            ? <ChevronDownIcon className="h-3.5 w-3.5 text-gray-400" />
                                            : <ChevronRightIcon className="h-3.5 w-3.5 text-gray-400" />
                                    )}
                                </button>
                                {item.sub && isExpanded && open && (
                                    <div className="ml-9 border-l border-gray-200 pl-3 mb-1">
                                        {item.sub.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setSubSelected(s.id)}
                                                className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors
                                                    ${subSelected === s.id ? "text-green-700 font-medium" : "text-gray-500 hover:text-gray-800"}`}
                                            >
                                                <s.icon className="h-4 w-4" />
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-gray-100 flex flex-col gap-1">
                    <button className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-md transition-colors ${!open && "justify-center px-0"}`}>
                        <Cog6ToothIcon className="h-5 w-5" />
                        {open && "Configuración"}
                    </button>
                    <button className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors ${!open && "justify-center px-0"}`}>
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                        {open && "Cerrar sesión"}
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">{currentLabel}</p>
                        <h1 className="text-lg font-semibold text-gray-900 leading-none">{currentSub || currentLabel}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    {selected === "Citas"      && subSelected === "VerCitas"      && <Citas />}
                    {selected === "Citas"      && subSelected === "CrearCita"     && <CrearCita />}
                    {selected === "Pacientes"  && subSelected === "VerPacientes"  && <Pacientes />}
                    {selected === "Pacientes"  && subSelected === "CrearPaciente" && <CrearPaciente />}
                    {selected === "Doctores"   && subSelected === "VerDoctores"   && <Doctores />}
                    {selected === "Doctores"   && subSelected === "CrearDoctor"   && <CrearDoctor />}
                    {selected === "Especialidades" && subSelected === "VerEspecialidades"  && <Especialistas />}
                </main>
            </div>
        </div>
    );
}