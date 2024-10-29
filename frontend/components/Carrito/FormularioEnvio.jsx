import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Swal from "sweetalert2";

const FormularioEnvio = ({ isOpen, onOpenChange }) => {
  const metodoEntrega = [
    { key: "presencial", label: "Presencial" },
    { key: "express", label: "Express" },
  ];

  const metodoPago = [
    { key: "efectivo", label: "En efectivo" },
    { key: "sinpe", label: "Por SINPE" },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-full max-w-3xl mx-auto"
      >
        <ModalHeader></ModalHeader>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <h2 className="text-principal font-bold text-xl flex justify-center">
                  Complete el formulario
                </h2>
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="text"
                      fullWidth
                      label="Nombre"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Input
                      type="text"
                      fullWidth
                      label="Apellido Uno"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Input
                      type="text"
                      fullWidth
                      label="Apellido Dos"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      fullWidth
                      label="Correo"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Input
                      type="tel"
                      fullWidth
                      label="Teléfono"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="date"
                      fullWidth
                      label="Fecha de entrega"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Select
                      fullWidth
                      label="Método de entrega"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione método de entrega"
                    >
                      {metodoEntrega.map((metodo) => (
                        <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      fullWidth
                      label="Método de pago"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione método de pago"
                    >
                      {metodoPago.map((metodo) => (
                        <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="text"
                      fullWidth
                      label="Provincia"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Input
                      type="text"
                      fullWidth
                      label="Cantón"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                    <Input
                      type="text"
                      fullWidth
                      label="Distrito"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      fullWidth
                      label="Dirección exacta"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  auto
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "Datos guardados exitosamente",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    onOpenChange();
                  }}
                >
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

export default FormularioEnvio;
