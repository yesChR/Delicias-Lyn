import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import ModalCreateProducto from "./ModalGestionProducto";
import { useState } from "react";

const FormularioProducto = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openCreateModal = () => {
        setIsEditing(false);
        setModalOpen(true);
    };

    const crearProducto = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Producto creado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, []);

    return (
        <>
            <Button 
                onClick={openCreateModal} 
                fullWidth={false} // Evita que ocupe el ancho completo
                radius="full" 
                size="lg" 
                className="bg-principal text-white text-2xs"
            >
                Crear
            </Button>
            
            <ModalCreateProducto
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                modo={isEditing}
            />
        </>
    );
}

export default FormularioProducto;
