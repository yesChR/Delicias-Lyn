import { Modal, ModalContent, ModalBody, ModalFooter, Button, Spinner, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ModalCarrito = ({ isOpen, onOpenChange, producto, quantity, total, idUsuario, actualizarCarrito  }) => {

    const [selectedTamaño, setSelectedTamaño] = useState(null);
    const [personalizacion, setPersonalizacion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Reiniciar los valores seleccionados cada vez que el modal se abra
        if (isOpen) {
            setSelectedTamaño(null);
            setPersonalizacion("");
        }
    }, [isOpen]);

    const handleAddToCart = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!selectedTamaño) {
            Swal.fire({
                icon: "error",
                title: "Debe seleccionar un tamaño",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        const datos = {
            idUsuario,
            idProducto: producto.idProducto,
            idTamaño: selectedTamaño,
            cantidad: quantity,
            montoXCantidad: total,
            personalizacion,
        };

        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/carrito/agregar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Producto agregado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });

                // Solicitar el carrito actualizado
                if (actualizarCarrito) {
                    actualizarCarrito();
                }

                onOpenChange(false);
            } else {
                const responseData = await response.json();
                Swal.fire({
                    title: "Error al añadir al carrito",
                    text: responseData?.message || "Inténtelo nuevamente.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error al añadir al carrito",
                text: "Hubo un problema al realizar la solicitud. Inténtelo nuevamente.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="p-4 mt-8">
                                    <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Complete el formulario</h2>
                                    <div className="w-full mt-10 flex justify-center">
                                        <div className="w-3/4">
                                            <label className="text-[14px] mb-4">Seleccione un tamaño:</label>
                                            <Select placeholder="Tamaños..." className="max-w-xs mb-4" onChange={(e) => setSelectedTamaño(e.target.value)}>
                                            {producto.tamaños.map((tamaño) => (
                                                <SelectItem key={tamaño.idTamaño} value={tamaño.idTamaño}>
                                                    {tamaño.nombre}
                                                </SelectItem>
                                            ))}
                                            </Select>
                                            <label className="text-[14px] mb-4">¿Requiere algún detalle personalizado?</label>
                                            <Textarea
                                            className="max-w-xs rounded-lg"
                                            placeholder="Especifique..."
                                            value={personalizacion}
                                            onChange={(e) => setPersonalizacion(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isLoading && (
                                <div className="flex justify-center items-center mt-4">
                                    <Spinner color="danger" size="lg" />
                                </div>
                            )}
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="danger" onClick={handleAddToCart} disabled={isLoading}>
                                    {isLoading ? "Enviando..." : "Enviar"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
    );
}
export default ModalCarrito;