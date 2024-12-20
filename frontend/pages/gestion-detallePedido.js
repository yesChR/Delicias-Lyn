import Detalle from "@/components/Pedidos/DetallePedido/detallePedido";
import Contenedor from "@/components/Contenedor/Contenedor";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const GestionDetallePage = () => {
    const searchParams = useSearchParams();
    const [idPedido, setIdPedido] = useState(searchParams?.get("idPedido"));
    useEffect(() => {
        const pedidoParam = searchParams?.get("idPedido");
        if (pedidoParam) {
            setIdPedido(pedidoParam);
        }
    }, [searchParams]);

    return (
        <Contenedor>
            <Detalle idPedido={idPedido} />
        </Contenedor>
    );
}

export default GestionDetallePage;