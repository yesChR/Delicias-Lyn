import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const ModalPrioridad = ({ isOpen, onOpenChange }) => {
    const ventanaEditarPrioridad = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Prioridad editada exitosamente",
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
                                        Editar Prioridad
                                    </h2>
                                    <div className="w-full mt-6 flex justify-center">
                                        <div className="w-3/4">
                                            <select 
                                                id="prioridad" 
                                                className="swal2-select w-full p-2 text-black border border-gray-300 rounded">
                                                <option value="grande">Alta</option>
                                                <option value="mediano">Media</option>
                                                <option value="pequeño">Baja</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button onClick={ventanaEditarPrioridad} color="danger" onPress={onClose}>
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
export default ModalPrioridad;
