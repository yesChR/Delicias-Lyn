import TablaPedidos from "./TablaPedidos";
import DetallePedido from "./TablaDetalle";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const Pedido = () => {
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  // console.log(pedidoSeleccionado);

  const handleDetallePedido = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  const handleVolverPedidos = () => {
    setPedidoSeleccionado(null);
  };

  return (
    <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
      <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
        <h1>
          {!pedidoSeleccionado
            ? "Mis pedidos"
            : `Detalle del pedido #${pedidoSeleccionado.idPedido}`}
        </h1>
      </div>
      {!pedidoSeleccionado ? (
        <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
          <div className="w-auto">
            <TablaPedidos onDetallePedido={handleDetallePedido}></TablaPedidos>
          </div>
        </div>
      ) : (
        <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
          <div className="w-auto">
            <DetallePedido />
            <div className="flex justify-between items-center mt-4 p-4 border-t">
              <Button
                color="danger"
                size="lg"
                onClick={handleVolverPedidos}
                // className="bg-primary text-white px-4 py-2 mt-4 rounded"
              >
                Volver a los pedidos
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedido;
