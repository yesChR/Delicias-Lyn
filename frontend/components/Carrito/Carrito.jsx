import { useState, useEffect } from "react";
import TablaCarrito from "./TablaCarrito";
import FormularioEnvio from "./FormularioEnvio";
import { useDisclosure } from "@nextui-org/react";

const Carrito = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [montoTotal, setMontoTotal] = useState(0);
  const [carrito, setCarrito] = useState([]); //Arreglo vacio para caerle depues de realizar el pedido

  const actualizarMontoTotal = (nuevoMontoTotal) => {
    setMontoTotal(nuevoMontoTotal);
  };

  // Función para vaciar el carrito después de crear el pedido
  const vaciarCarrito = () => {
      setCarrito([]);
      setMontoTotal(0); // Reiniciar el monto total también
  };

  return (
    <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
      <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
        <h1>Mi carrito de compras</h1>
      </div>
      <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
        <div className="w-auto">
          <TablaCarrito 
          onOpen={onOpen} 
          actualizarMontoTotal={actualizarMontoTotal}
          carrito={carrito}
          setCarrito={setCarrito} // Pasar carrito y su actualizador a TablaCarrito
          ></TablaCarrito>
        </div>
      </div>
      <FormularioEnvio
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        montoTotal={montoTotal}
        recargar={vaciarCarrito} // Pasar la función para vaciar el carrito a FormularioEnvio
      ></FormularioEnvio>
    </div>
  );
};

export default Carrito;
