import { Modal, ModalContent, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            <div className="p-4 mt-4">
                                <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar Estado</h2>
                                <div className="w-full mt-6 flex justify-center">
                                    <div className="w-3/4">
                                        <Select placeholder="Seleccione estado" className="max-w-xs mt-4" radius="full">
                                            <SelectItem value="Aceptado">Aceptado</SelectItem>
                                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                                            <SelectItem value="Rechazado">Rechazado</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button onClick={() => { ventanaEditarEstado(); onClose(); }} color="danger">
                                Editar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalEstado;
