import TablaPedidosEstados from "./TablaPedidosEstados";
import ModalPrioridad from "./ModalPrioridad";
import ModalEstado from "./ModalEstado";
import { useState, useEffect } from "react";

const PedidosEstados = ({ idEstado }) => {
    console.log("desde pedidosEstados", idEstado);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Estados separados para cada modal
    const [isPrioridadOpen, setIsPrioridadOpen] = useState(false);
    const [isEstadoOpen, setIsEstadoOpen] = useState(false);
    const [estados, setEstados] = useState([]);
    const [pedidoSelect, setPedidoSelect] = useState(null);//porque necesito saber cual es el pedido que se va a editar
    // Funciones para abrir y cerrar cada modal
    const openModalPrioridad = () => setIsPrioridadOpen(true);
    const openModalEstado = () => setIsEstadoOpen(true);
    const closeModalPrioridad = () => setIsPrioridadOpen(false);
    const closeModalEstado = () => setIsEstadoOpen(false);
    const [refrescar, setRefrescar] = useState(false);
    const recargar = () => {
        setRefrescar(!refrescar);
    }

    //para jalar datos de la bd se usa useEffect y fetch
    useEffect(() => {
        const visualizarEstados = async () => {
            try {
                const resp = await fetch(`${apiUrl}/estado/visualizar`);
                const datos = await resp.json();
                setEstados(datos);
            } catch (error) {
                console.error("Error al obtener estados", error);
            }
        };
        visualizarEstados();
    }, []);


    return (
        <div className="w-full flex flex-col justify-center lg:gap-10 gap-4">
            <div className="text-principal font-bold lg:text-3xl text-2xl flex justify-center mt-6">
                <h1>Pedidos {estados[idEstado - 1]?.nombre || 'Desconocido'}</h1>
            </div>
            <div className="flex-col lg:flex-row w-full flex justify-center lg:gap-24 gap-4">
                <div className="w-auto">
                    
                    <TablaPedidosEstados
                        openModalPrioridad={openModalPrioridad}
                        openModalEstado={openModalEstado}
                        setPedidoSelect={setPedidoSelect}
                        idEstado={idEstado}
                        refrescar={refrescar}
                    />
                    <ModalPrioridad
                        isOpen={isPrioridadOpen}
                        onOpenChange={closeModalPrioridad}
                        pedidoSelect={pedidoSelect}
                        recargar={recargar}
                    />
                    <ModalEstado
                        isOpen={isEstadoOpen}
                        onOpenChange={closeModalEstado}
                        pedidoSelect={pedidoSelect}
                        recargar={recargar}
                    />
                </div>
            </div>
        </div>
    );
}

export default PedidosEstados;
