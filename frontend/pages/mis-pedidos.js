import Pedido from "@/components/Pedido-Cliente/Pedido";

//Este es por default, todos los componentes entran al contenedor
import Contenedor from "@/components/Contenedor/Contenedor";

const PedidosPage = () => {
    return (
        <Contenedor>
            <Pedido></Pedido>
        </Contenedor>
    );
}

export default PedidosPage;
