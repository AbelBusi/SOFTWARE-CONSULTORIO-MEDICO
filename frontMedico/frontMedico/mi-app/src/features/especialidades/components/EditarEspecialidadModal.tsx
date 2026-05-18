import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface Props {
    especialidad: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditarEspecialidadModal({ especialidad, isOpen, onClose }: Props) {
    if (!especialidad) return null;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                                    Editar Especialidad
                                </h3>
                                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XMarkIcon className="h-5 w-5 text-gray-400" /></button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">NOMBRE</label>
                                    <input type="text" defaultValue={especialidad.nombre} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">ESTADO OPERATIVO</label>
                                    <div className="flex gap-4 p-2 bg-gray-50 rounded-lg">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="estado" defaultChecked={especialidad.estado === 'activo'} className="text-green-600 focus:ring-green-500" /> Activo
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="estado" defaultChecked={especialidad.estado === 'inactivo'} className="text-green-600 focus:ring-green-500" /> Inactivo
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100">Descartar</button>
                                    <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-100">Actualizar Datos</button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}