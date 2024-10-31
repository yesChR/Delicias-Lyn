import { Modal, Input, ModalContent, ModalBody, ModalFooter, Button, Select } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const ModalProducto = ({ isOpen, onOpenChange }) => {
    const ventanaEditar = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Producto editado exitosamente",
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
                                <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar producto</h2>
                                
                                <Input  type="text" radius="full" placeholder="Nombre" />
                                
                                <Select className="mb-4" label="Categoría" placeholder="Selecciona una categoría">
                                    <Select.Option value="categoria1">Categoría 1</Select.Option>
                                    <Select.Option value="categoria2">Categoría 2</Select.Option>
                                </Select>
                                
                                <Select className="mb-4" label="Subcategoría" placeholder="Selecciona una subcategoría">
                                    <Select.Option value="subcategoria1">Subcategoría 1</Select.Option>
                                    <Select.Option value="subcategoria2">Subcategoría 2</Select.Option>
                                </Select>
                                
                                <Input className="mb-4" type="text" radius="full" placeholder="Tamaño" />
                                <Input className="mb-4" type="number" radius="full" placeholder="Precio" />
                                <Input className="mb-4" type="text" radius="full" placeholder="Descripción" />
                                
                                <Select className="mb-4" label="Tipo" placeholder="Selecciona un tipo">
                                    <Select.Option value="tipo1">Tipo 1</Select.Option>
                                    <Select.Option value="tipo2">Tipo 2</Select.Option>
                                </Select>
                                
                                <Select className="mb-4" label="Estado" placeholder="Selecciona un estado">
                                    <Select.Option value="disponible">Disponible</Select.Option>
                                    <Select.Option value="agotado">Agotado</Select.Option>
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
                            <Button onClick={ventanaEditar} color="danger" onPress={onClose}>Editar</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ModalProducto;
