import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";

const ModalCarrito = ({ isOpen, onOpenChange, tamaños = [], onConfirm }) => {
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

  const ventanaCarrito = useCallback(async () => {
    if (!selectedTamaño) {
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar un tamaño",
        confirmButtonText: "Aceptar",
      });
      return false; // Retorna false si no se seleccionó el tamaño
    }
  
    setIsLoading(true); // Estado de carga activado
  
    try {
      await onConfirm(selectedTamaño, personalizacion); // Realizar la confirmación
      Swal.fire({
        icon: "success",
        title: "Producto agregado exitosamente",
        showConfirmButton: false,
        timer: 1000,
      });
      return true; // Retorna true si la solicitud fue exitosa
    } catch (error) {
      Swal.fire({
        title: "Error al agregar el producto",
        text: "Hubo un problema al añadir el producto al carrito. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false; // Retorna false si ocurrió un error
    } finally {
      setIsLoading(false); // Estado de carga desactivado
    }
  }, [selectedTamaño, personalizacion, onConfirm]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="p-4 mt-8">
                <h2 className="text-principal font-bold text-xl flex justify-center mb-8">
                  Complete el formulario
                </h2>
                <div className="w-full mt-10 flex justify-center">
                  <div className="w-3/4">
                    <label className="text-[14px] mb-4">
                      Seleccione un tamaño:
                    </label>
                    <Select
                      placeholder="Tamaños..."
                      className="max-w-xs mb-4"
                      onChange={(e) => setSelectedTamaño(e.target.value)}
                      aria-label="Seleccione un tamaño para el producto"
                    >
                      {tamaños.length > 0 ? (
                        tamaños.map((tamaño) => (
                          <SelectItem
                            key={tamaño.idTamaño}
                            value={tamaño.idTamaño}
                          >
                            {tamaño.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="">
                          No hay tamaños disponibles
                        </SelectItem>
                      )}
                    </Select>

                    <label className="text-[14px] mb-4">
                      ¿Requiere algún detalle personalizado?
                    </label>
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
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                }}
              >
                Cerrar
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  // Esperar la confirmación del backend antes de cerrar el modal
                  const success = await ventanaCarrito();
                  if (success) {
                    onClose(); // Cerrar el modal solo si la operación fue exitosa
                  }
                }}
                disabled={isLoading} // Deshabilitar el botón mientras se procesa la solicitud
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCarrito;
