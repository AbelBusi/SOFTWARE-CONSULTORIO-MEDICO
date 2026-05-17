import hospitalImg from "../../../../../../app-front-consultorio/src/assets/image3.jpg";
import { useState } from "react";
import {
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    XMarkIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { login } from "./services/authService";
import axios from "axios";

type LoginProps = {
    onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
    const [showPass, setShowPass] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [claveAcceso, setClaveAcceso] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usuario || !claveAcceso) return;

        setCargando(true);
        setError(null);
        setServerError(null);

        try {
            const data = await login({ usuario, claveAcceso });
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            onLogin();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.code === "ERR_NETWORK" || !err.response) {
                    setServerError("No se pudo establecer conexión con el servidor. Verifica tu red o CORS.");
                } else {
                    setError(err.response?.data?.message || "Credenciales inválidas, intente de nuevo.");
                }
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row relative">

            {serverError && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-white border-l-4 border-red-600 rounded-r-xl shadow-xl border border-gray-100 p-4 flex items-start gap-3">
                        <div className="p-1 bg-red-50 rounded-lg text-red-600 shrink-0">
                            <ExclamationTriangleIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">Error de conexión</h3>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{serverError}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setServerError(null)}
                            className="text-gray-400 hover:text-gray-600 p-0.5 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex items-center justify-center bg-white px-6 py-12 sm:px-12 lg:w-1/2">
                <div className="w-full max-w-sm">

                    <p className="text-xl font-bold tracking-tight mb-8">
                        <span className="text-green-700">Clínica</span>
                        <span className="text-gray-400 font-normal">Pro</span>
                    </p>

                    <div className="mb-7">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bienvenido</h1>
                        <p className="mt-1.5 text-sm text-gray-400">Ingresa tus credenciales para continuar</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    required
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="nombre@clinica.com"
                                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Contraseña
                                </label>
                                <button type="button" className="text-xs text-green-700 hover:text-green-800 font-medium transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    required
                                    value={claveAcceso}
                                    onChange={(e) => setClaveAcceso(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPass ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input id="remember" type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-green-700" />
                            <label htmlFor="remember" className="text-sm text-gray-500 select-none cursor-pointer">
                                Recordar sesión
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={cargando}
                            className="w-full py-2.5 rounded-lg bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white text-sm font-bold transition-all shadow-sm mt-2 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {cargando ? "Autenticando..." : "Iniciar sesión"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-400">
                        ¿Problemas para ingresar?{" "}
                        <span className="text-green-700 font-medium cursor-pointer hover:underline">
                            Contacta al administrador
                        </span>
                    </p>

                    <p className="mt-6 text-center text-xs text-gray-300">
                        © 2026 ClínicaPro · Sistema de Gestión Hospitalaria
                    </p>
                </div>
            </div>

            <div className="relative h-56 sm:h-72 lg:h-auto lg:flex-1 lg:w-1/2 order-first lg:order-last overflow-hidden">
                <img
                    src={hospitalImg}
                    alt="Clínica"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/75 via-green-900/10 to-transparent" />

                <div className="hidden lg:flex absolute bottom-10 left-10 right-10 flex-col gap-4">
                    <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/80 text-xs font-medium">Sistema activo</span>
                    </div>
                    <div className="flex gap-8">
                        {[
                            { label: "Pacientes", value: "1,240" },
                            { label: "Doctores",  value: "38"    },
                            { label: "Citas hoy", value: "94"    },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-white text-2xl font-bold leading-none">{value}</p>
                                <p className="text-green-300 text-xs mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}