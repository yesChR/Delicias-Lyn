import TablaAceptado from "./TablaAceptado";
import ModalPrioridad from "./ModalPrioridad";
import ModalEstado from "./ModalEstado";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Aceptado = () => {
    // Estados separados para cada modal
    const [isPrioridadOpen, setIsPrioridadOpen] = useState(false);
    const [isEstadoOpen, setIsEstadoOpen] = useState(false);

    // Funciones para abrir y cerrar cada modal
    const openModalPrioridad = () => setIsPrioridadOpen(true);
    const closeModalPrioridad = () => setIsPrioridadOpen(false);
    const openModalEstado = () => setIsEstadoOpen(true);
    const closeModalEstado = () => setIsEstadoOpen(false);

    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Pedidos Aceptados</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-auto">
                    {/* Pasar funciones de apertura como propiedades a TablaAceptado */}
                    <TablaAceptado 
                        onOpenPrioridad={openModalPrioridad} 
                        onOpenEstado={openModalEstado}
                    />
                    <ModalPrioridad 
                        isOpen={isPrioridadOpen} 
                        onOpenChange={closeModalPrioridad} 
                    />
                    <ModalEstado 
                        isOpen={isEstadoOpen} 
                        onOpenChange={closeModalEstado} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Aceptado;
