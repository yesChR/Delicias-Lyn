import { Modal, ModalContent, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const ModalCarrito = ({ isOpen, onOpenChange }) => {

    const tamaños = [
        {
            idTamaño: 1,
            nombre: "Grande",
        },
        {
            idTamaño: 2,
            nombre: "Mediano",
        },
        {
            idTamaño: 3,
            nombre: "Pequeño",
        },
        {
            idTamaño: 4,
            nombre: "Personal",
        }
    ];

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="p-4 mt-8">
                                    <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Rellene el formulario</h2>
                                    <div className="w-full mt-10 flex justify-center">
                                        <div className="w-3/4">
                                            <label className="text-[14px] mb-4">Seleccione un tamaño:</label>
                                            <Select placeholder="Tamaños..." className="max-w-xs mb-4 ">
                                                {tamaños.map((tamaños) => (
                                                    <SelectItem key={tamaños.idTamaño} value={tamaños.idTamaño}>
                                                        {tamaños.nombre}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <label className="text-[14px] mb-4">¿Requiere algún detalle personalizado?</label>
                                            <Textarea
                                                className="max-w-xs rounded-lg"
                                                placeholder="Especifique..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="danger" onPress={onClose}>
                                    Enviar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalCarrito;