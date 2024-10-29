import TablaCarrito from "./TablaCarrito";
import FormularioEnvio from "./FormularioEnvio";
import { useDisclosure } from "@nextui-org/react";

const Carrito = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
      <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
        <h1>Mi carrito de compras</h1>
      </div>
      <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
      <div className="w-auto">
          <TablaCarrito onOpen={onOpen}></TablaCarrito>
        </div>
      </div>
      <FormularioEnvio
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></FormularioEnvio>
    </div>
  );
};

export default Carrito;
