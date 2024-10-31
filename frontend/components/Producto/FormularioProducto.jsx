import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
/**
 * 
 * @returns 
 * 
 *
 */

/** */
import ModalCreateProducto from "./GestionProducto";
import { useState } from "react";


const FormularioProducto = () => {

    const [isModalEditProductoOpen, setIsModalEditProductoOpen] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para determinar si es edición o creación
    const openEditModal = () => {
        setIsEditing(true); // Modo edición
        setModalOpen(true);
    };

    const openCreateModal = () => {
        setIsEditing(false); // Modo creación
        setModalOpen(true);
    };


    const crearProducto = useCallback(() => {
        //crear las condiciones luego
        Swal.fire({
            icon: "success",
            title: "Producto creado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, [])
    return (
        <>
    <Button onClick={openCreateModal} fullWidth radius="full" size="lg" className="bg-principal text-white flex justify-center text-2xs">
        Crear
    </Button>
    
    <ModalCreateProducto
    isOpen={isModalOpen}
    onOpenChange={setModalOpen}
    modo={isEditing} // Pasa el estado aquí
/>
</>
    );
}

export default FormularioProducto;
