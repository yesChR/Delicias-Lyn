import { Modal, ModalContent, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            <div className="p-4 mt-4">
                                <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar Prioridad</h2>
                                <div className="w-full mt-6 flex justify-center">
                                    <div className="w-3/4">
                                        <Select placeholder="Seleccione prioridad" className="max-w-xs mt-4" radius="full">
                                            <SelectItem value="Alta">Alta</SelectItem>
                                            <SelectItem value="Media">Media</SelectItem>
                                            <SelectItem value="Baja">Baja</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button onClick={() => { ventanaEditarPrioridad(); onClose(); }} color="danger">
                                Editar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalPrioridad;
