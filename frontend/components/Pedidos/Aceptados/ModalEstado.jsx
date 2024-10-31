import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const ModalEstado = ({ isOpen, onOpenChange }) => {
    const ventanaEditarEstado = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Estado editado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, []);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="p-4 mt-4 text-black">
                                    <h2 className="text-principal font-bold text-xl flex justify-center mb-8">
                                        Editar Estado
                                    </h2>
                                    <div className="w-full mt-6 flex justify-center">
                                        <div className="w-3/4">
                                            <select 
                                                id="estado" 
                                                className="swal2-select w-full p-2 text-black border border-gray-300 rounded"
                                            >
                                                <option value="Aceptado">Aceptado</option>
                                                <option value="Rechazado">Rechazado</option>
                                                <option value="Pendiente">Pendiente</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button onClick={ventanaEditarEstado} color="danger" onPress={onClose}>
                                    Editar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalEstado;
