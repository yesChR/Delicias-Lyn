import FormularioSubcategoria from "./FormularioSubcategoria";
import ModalSubcategoria from "./Modal";
import TablaSubcategoria from "./TablaSubcategoria";
import { useDisclosure } from "@nextui-org/react";

const Subcategoria = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4 py-6">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Subcategorías</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-full lg:w-1/2"> {/* Ajustar el ancho para pantallas grandes */}
                    <TablaSubcategoria onOpen={onOpen}></TablaSubcategoria>
                </div>
                <div className="w-full lg:w-1/5"> {/* Ajustar el ancho para pantallas grandes */}
                    <FormularioSubcategoria></FormularioSubcategoria>
                </div>
            </div>
            <ModalSubcategoria isOpen={isOpen} onOpenChange={onOpenChange}></ModalSubcategoria>
        </div>
    );
}

export default Subcategoria;
