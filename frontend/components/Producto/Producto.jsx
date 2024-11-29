import FormularioProducto from "./FormularioProducto";
import TablaProducto from "./TablaProducto";
import ModalProducto from "./ModalProducto";
import { useState } from "react";

const Producto = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [refrescar, setRefrescar] = useState(false);

  const recargarProductos = () => setRefrescar(!refrescar);

  return (
    <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
      <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
        <h1>Producto</h1>
      </div>
      <FormularioProducto recargar={recargarProductos} />
      <TablaProducto
        refrescar={refrescar}
        onOpen={() => setIsOpen(true)}
        setProductoSeleccionado={setProductoSeleccionado}
      />
      <ModalProducto
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        productoSeleccionado={productoSeleccionado}
        recargar={recargarProductos}
      />
    </div>
  );
};

export default Producto;
