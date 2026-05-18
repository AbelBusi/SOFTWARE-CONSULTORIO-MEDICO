import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function CrearEspecialidadModal({ isOpen, onClose }: Props) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <PlusIcon className="h-5 w-5 text-green-600" />
                                    Nueva Especialidad
                                </h3>
                                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XMarkIcon className="h-5 w-5 text-gray-400" /></button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">NOMBRE</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all" placeholder="Ej. Odontología" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">DESCRIPCIÓN</label>
                                    <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500/20 outline-none h-24 resize-none" placeholder="Breve descripción del área..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">PISO / UBICACIÓN</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                                            <option>1er Piso</option>
                                            <option>2do Piso</option>
                                            <option>3er Piso</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">DEMANDA</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                                            <option>Baja</option>
                                            <option>Media</option>
                                            <option>Alta</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
                                    <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-sm shadow-green-200">Guardar Especialidad</button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}