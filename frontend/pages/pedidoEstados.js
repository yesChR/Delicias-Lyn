import PedidoEstados from "@/components/Pedidos/PedidoEstados/PedidosEstados";
import Contenedor from "@/components/Contenedor/Contenedor";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const PedidoEstadosPage = () => {
    const searchParams = useSearchParams();
    const [idEstado, setIdEstado] = useState(searchParams?.get("idEstado"));
    
    useEffect(() => {
        const estadoParam = searchParams?.get("idEstado");
        if (estadoParam) {
            setIdEstado(estadoParam);
        }
    }, [searchParams]);

    console.log(idEstado);

    return (
        <Contenedor>
            <PedidoEstados idEstado={idEstado} />
        </Contenedor>
    );
};

export default PedidoEstadosPage;
