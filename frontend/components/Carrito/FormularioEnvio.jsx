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

  const provincias = [
    // { key: "san_jose", label: "San José" },
    // { key: "alajuela", label: "Alajuela" },
    // { key: "cartago", label: "Cartago" },
    // { key: "guanacaste", label: "Guanacaste" },
    // { key: "heredia", label: "Heredia" },
    // { key: "puntarenas", label: "Puntarenas" },
    { key: "limon", label: "Limón" },
  ];
  
  const cantones = [
    { key: "limon", label: "Limón" },
    { key: "pococi", label: "Pococí" },
    { key: "siquirres", label: "Siquirres" },
    { key: "talamanca", label: "Talamanca" },
    { key: "matina", label: "Matina" },
    { key: "guacimo", label: "Guácimo" },
  ];

  const distritos = [
    { key: "limon", label: "Limón" },
    { key: "valle_la_estrella", label: "Valle la Estrella" },
    { key: "rio_blanco", label: "Río Blanco" },
    { key: "matama", label: "Matama" },
    { key: "guapiles", label: "Guápiles" },
    { key: "jimenez", label: "Jimenez" },
    { key: "la_rita", label: "La Rita" },
    { key: "roxana", label: "Roxana" },
    { key: "cariari", label: "Cariari" },
    { key: "colorado", label: "Colorado" },
    { key: "la_colonia", label: "La Colonia" },
    { key: "siquirres", label: "Siquirres" },
    { key: "pacuarito", label: "Pacuarito" },
    { key: "florida", label: "Florida" },
    { key: "germania", label: "Germania" },
    { key: "el_cairo", label: "El Cairo" },
    { key: "alegria", label: "Alegría" },
    { key: "reventazon", label: "Reventazón" },
    { key: "bratsi", label: "Bratsi" },
    { key: "sixaola", label: "Sixaola" },
    { key: "cahuita", label: "Cahuita" },
    { key: "telire", label: "Telire" },
    { key: "batan", label: "Batán" },
    { key: "carrandi", label: "Carrandi" },
    { key: "mercedes", label: "Mercedes" },
    { key: "pocora", label: "Pocora" },
    { key: "rio_jimenez", label: "Río Jiménez" },
    { key: "duacari", label: "Duacarí" },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="w-full max-w-3xl mx-auto"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-principal font-bold text-xl flex justify-center">
                  Complete el formulario
                </h2>
              </ModalHeader>

              <ModalBody>
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
                  <Select
                    fullWidth
                    label="Provincia"
                    variant="bordered"
                    color="danger"
                    className="text-black"
                    placeholder="Seleccione la provincia"
                  >
                    {provincias.map((provincia) => (
                      <SelectItem key={provincia.key}>{provincia.label}</SelectItem>
                    ))}
                  </Select>


                  <Select
                    fullWidth
                    label="Cantón"
                    variant="bordered"
                    color="danger"
                    className="text-black"
                    placeholder="Seleccione el cantón"
                  >
                    {cantones.map((canton) => (
                      <SelectItem key={canton.key}>{canton.label}</SelectItem>
                    ))}
                  </Select>


                  <Select
                    fullWidth
                    label="Distrito"
                    variant="bordered"
                    color="danger"
                    className="text-black"
                    placeholder="Seleccione el distrito"
                  >
                    {distritos.map((distrito) => (
                      <SelectItem key={distrito.key}>{distrito.label}</SelectItem>
                    ))}
                  </Select>


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
