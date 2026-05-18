import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, TagIcon, MapPinIcon, UserGroupIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface Especialidad {
    id: number;
    nombre: string;
    descripcion: string;
    numDoctores: number;
    estado: "activo" | "inactivo";
    demanda: "Alta" | "Media" | "Baja";
    piso: string;
}

interface Props {
    especialidad: Especialidad | null;
    onClose: () => void;
}

export default function VerDetalleEspecialidadModal({ especialidad, onClose }: Props) {
    if (!especialidad) return null;

    return (
        <Transition show={!!especialidad} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <TagIcon className="h-6 w-6 text-green-600" />
                                        </div>
                                        <Dialog.Title className="text-xl font-bold text-gray-900">
                                            Detalle de Área
                                        </Dialog.Title>
                                    </div>
                                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                        <XMarkIcon className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nombre de Especialidad</label>
                                        <p className="text-lg font-semibold text-gray-800">{especialidad.nombre}</p>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Descripción</label>
                                        <p className="text-sm text-gray-600 leading-relaxed">{especialidad.descripcion}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-700">{especialidad.piso}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <UserGroupIcon className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-700">{especialidad.numDoctores} Doctores</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <ArrowTrendingUpIcon className="h-4 w-4 text-amber-500" />
                                            <span className="text-xs font-bold text-amber-600">Demanda {especialidad.demanda}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${especialidad.estado === 'activo' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                                            {especialidad.estado === 'activo' ? 'Operativo' : 'Inactivo'}
                                        </span>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}