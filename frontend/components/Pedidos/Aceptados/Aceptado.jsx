import TablaAceptado from "./TablaAceptado";
import { useDisclosure } from "@nextui-org/react";

const Aceptado = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Pedidos Aceptados</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4"> 
                <div className="w-full lg:w-1/2"> {/* Ajustar el ancho para pantallas grandes */}
                    <TablaAceptado onOpen={onOpen}></TablaAceptado>
                </div> 
            </div>
        </div>
    );
}

export default Aceptado;
