import hospitalImg from "../../assets/image3.jpg";
import {
    EnvelopeIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

type LoginProps = {
    onLogin: () => void; // 👉 declaramos la prop
};

export default function Login({ onLogin }: LoginProps) {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-gray-100">
            {/* LEFT - FORM */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-10">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Bienvenido</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Ingresa tus credenciales para continuar
                    </p>

                    <form className="space-y-5">
                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-700">Email</label>
                            <div className="relative mt-1">
                                <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                    bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                    bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="button"
                            onClick={onLogin} // 👉 aquí usamos la prop
                            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium
                transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT - IMAGE */}
            <div className="hidden lg:flex w-1/2">
                <img
                    src={hospitalImg} // tu imagen
                    alt="Healthcare"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

