import TablaDetallePedido from "./tablaDetallePedido";
import Salir from "./salirDetalle";
import { useDisclosure } from "@nextui-org/react";

const Detalle = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">
                Detalle del pedido
                </h1>
                <h2 className="text-lg mt-2">
                #Pedido: 1
                </h2>
            </div>

            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
            <div className="w-auto">
                <TablaDetallePedido onOpen={open}></TablaDetallePedido>
            </div>
            </div>
            <div className="w-full lg:w-1/5">
                <Salir></Salir>
                </div>
        </div>
    );
}

export default Detalle;
