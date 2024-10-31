import TablaAceptado from "./TablaAceptado";
import ModalPrioridad from "./ModalPrioridad";
import ModalEstado from "./ModalEstado";
import { useDisclosure } from "@nextui-org/react";

const Aceptado = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    console.log("Modal isOpen:", isOpen); // Para verificar si el estado cambia

    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Pedidos Aceptados</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-auto">
                    {/* Pasar onOpen como propiedad a TablaAceptado */}
                    <TablaAceptado onOpen={onOpen}></TablaAceptado>
                </div>
            </div>
            {/* Modal se muestra si isOpen es true */}
            <ModalPrioridad isOpen={isOpen} onOpenChange={onOpenChange}></ModalPrioridad>
            <ModalEstado isOpen={isOpen} onOpenChange={onOpenChange}></ModalEstado>
        </div>
    );
}

export default Aceptado;
