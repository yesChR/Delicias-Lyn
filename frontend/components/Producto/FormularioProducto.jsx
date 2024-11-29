import { Button } from "@nextui-org/react";
import ModalCreateProducto from "./ModalGestionProducto";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const FormularioProducto = ({ recargar }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openCreateModal = () => {
        setIsEditing(false);
        setModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-end">
                <Button
                    onClick={openCreateModal}
                    radius="full"
                    size="lg"
                    className="bg-principal text-white text-2xs ml-auto mb-2"
                >
                    Crear
                    <span>
                        <FaPlus />
                    </span>
                </Button>

                <ModalCreateProducto
                    isOpen={isModalOpen}
                    onOpenChange={setModalOpen}
                    modo={isEditing}
                    recargar={recargar} // Se pasa la función para recargar la tabla
                />
            </div>
        </>
    );
};

export default FormularioProducto;
