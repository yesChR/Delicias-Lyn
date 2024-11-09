import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import ModalCreateProducto from "./ModalGestionProducto";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
      timer: 1000,
    });
  }, []);

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
        />
      </div>
    </>
  );
};

export default FormularioProducto;
