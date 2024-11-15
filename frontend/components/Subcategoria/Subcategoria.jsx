import FormularioSubcategoria from "./FormularioSubcategoria";
import ModalSubcategoria from "./Modal";
import TablaSubcategoria from "./TablaSubcategoria";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Subcategoria = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [subcategoriaSelect, setSubcategoriaSelect] = useState(null);//porque necesito saber cual es la categoria que se va a editar
    const [refrescar, setRefrescar] = useState(false);
    const recargar = () => {
        setRefrescar(!refrescar);
    }
    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4 py-6">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Subcategorías</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-full lg:w-1/2"> {/* Ajustar el ancho para pantallas grandes */}
                    <TablaSubcategoria onOpen={onOpen} setSubcategoriaSelect={setSubcategoriaSelect} refrescar={refrescar}></TablaSubcategoria>
                </div>
                <div className="w-full lg:w-1/5"> {/* Ajustar el ancho para pantallas grandes */}
                    <FormularioSubcategoria recargar={recargar}></FormularioSubcategoria>
                </div>
            </div>
            <ModalSubcategoria
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                subcategoriaSelect={subcategoriaSelect}
                recargar={recargar}
            >
            </ModalSubcategoria>
        </div> 
    );
}

export default Subcategoria;
