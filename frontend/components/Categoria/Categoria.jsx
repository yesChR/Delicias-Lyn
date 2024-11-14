import FormularioCategoria from "./FormularioCategoria";
import TablaCategoria from "./TablaCategoria";
import ModalCategoria from "./Modal";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Categoria = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [categoriaSelect, setCategoriaSelect] = useState(null);//porque necesito saber cual es la categoria que se va a editar
    const [refrescar, setRefrescar] = useState(false);
    const recargar = () => {
        setRefrescar(!refrescar);
    }
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Categorías</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-full lg:w-1/2">
                    <TablaCategoria onOpen={onOpen} setCategoriaSelect={setCategoriaSelect} refrescar={refrescar}></TablaCategoria>
                </div>
                <div className="w-full lg:w-1/5">
                    <FormularioCategoria recargar={recargar}></FormularioCategoria>
                </div>
            </div>
            <ModalCategoria
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                categoriaSelect={categoriaSelect}
                recargar={recargar}
            >
            </ModalCategoria>
        </div>
    );
}

export default Categoria;
