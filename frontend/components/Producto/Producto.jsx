import FormularioProducto from "./FormularioProducto";
import TablaProducto from "./TablaProducto";
import ModalProducto from "./ModalProducto";
import { useDisclosure } from "@nextui-org/react";

const Producto = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Producto</h1>
            </div>
            <div className="w-full lg:w-1/5"> {/* Ajustar el ancho para pantallas grandes */}
                <FormularioProducto></FormularioProducto>
                </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4"> 
                <div className="w-full lg:w-1/2"> {/* Ajustar el ancho para pantallas grandes */}
                    <TablaProducto onOpen={onOpen}></TablaProducto>
                </div> 
            </div>
            <ModalProducto isOpen={isOpen} onOpenChange={onOpenChange}></ModalProducto>
        </div>
    );
}

export default Producto;
