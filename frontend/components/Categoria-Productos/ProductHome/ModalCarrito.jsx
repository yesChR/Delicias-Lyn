import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const ModalCarrito = ({ isOpen, onOpenChange, idProducto, idUsuario }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [selectedTamaño, setSelectedTamaño] = useState(null);
  const [personalizacion, setPersonalizacion] = useState("");
  const [cantidad, setCantidad] = useState(1); //Cantidad minima

  const ventanaCarrito = useCallback(() => {
    Swal.fire({
      icon: "success",
      title: "Agregado exitosamente",
      showConfirmButton: false,
      timer: 1000,
    });
  }, []);

  const AgregarProducto = async () => {
    if (!selectedTamaño) {
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar un tamaño",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    //idProducto y idUsuario deben pasarse desde el componente ProductCard para identificar qué producto agregar al carrito y a qué usuario pertenece.
    try {
      const response = await fetch(`${apiUrl}/carrito/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario,
          idProducto,
          idTamaño: selectedTamaño,
          cantidad,
          personalizacion,
        }),
      });

      if (response.ok) {
        ventanaCarrito();
        onOpenChange(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al agregar al carrito",
          text: errorData.error,
        });
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo agregar el producto al carrito.",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="p-4 mt-8">
                  <h2 className="text-principal font-bold text-xl flex justify-center mb-8">
                    Rellene el formulario
                  </h2>
                  <div className="w-full mt-10 flex justify-center">
                    <div className="w-3/4">
                      <label className="text-[14px] mb-4">
                        Seleccione un tamaño:
                      </label>
                      <Select
                        placeholder="Tamaños..."
                        className="max-w-xs mb-4 "
                        onValueChange={(value) => setSelectedTamaño(value)}
                      >
                        {tamaños.map((tamaños) => (
                          <SelectItem
                            key={tamaños.idTamaño}
                            value={tamaños.idTamaño}
                          >
                            {tamaños.nombre}
                          </SelectItem>
                        ))}
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
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button onClick={AgregarProducto} color="danger">
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalCarrito;
