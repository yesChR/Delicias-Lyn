import { Modal, Input, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const ModalCategoria = ({ isOpen, onOpenChange }) => {

    const ventanaEditar = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Categoría editada exitosamente",
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
                                <div className="p-4 mt-4">
                                    <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar categoría</h2>
                                    <div className="w-full mt-6 flex justify-center">
                                        <div className="w-3/4">
                                            <Input type="text" radius="full" placeholder="Nombre" />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button onClick={ventanaEditar} color="danger" onPress={onClose}>
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
export default ModalCategoria;