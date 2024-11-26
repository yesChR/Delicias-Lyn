import ModalInforme from "./ModalInforme"; // Modal para generar informe
import { useDisclosure } from "@nextui-org/react";

const Informe = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4 py-6">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Gestión de Informes</h1>
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={onOpen}
                    className="bg-pink-500 text-white p-4 rounded-lg shadow-md hover:bg-pink-400"
                >
                    Generar Informe
                </button>
            </div>

            {/* Modal para la generación del informe */}
            <ModalInforme isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
};

export default Informe;
