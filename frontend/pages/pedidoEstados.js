import PedidoEstados from "@/components/Pedidos/PedidoEstados/PedidosEstados";
import Contenedor from "@/components/Contenedor/Contenedor";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import RolePageGuard from "@/components/Guards/RolePageGuard";


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
            <RolePageGuard role={0}>

                <PedidoEstados idEstado={idEstado} />
            </RolePageGuard>

        </Contenedor>
    );
};

export default PedidoEstadosPage;
