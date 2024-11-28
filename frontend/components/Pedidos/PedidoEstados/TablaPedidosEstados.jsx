import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import { Chip } from "@nextui-org/react";

const statusPrioridadColors = {
    1: "success",
    2: "warning",
    3: "danger"
};

const statusPrioridadNombre = {
    1: "Baja",
    2: "Media",
    3: "Alta"
};

const TablaPedidosEstados = ({ openModalPrioridad, openModalEstado, setPedidoSelect, idEstado, refrescar }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [estadosPedidos, setEstadosPedidos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numElementos = 5;

    const metodoEntrega = {
        1: "Presencial",
        2: "Express"
    }

    const metodoPago = {
        1: "Efectivo",
        2: "Sinpe"
    }

    const columns = [
        { name: "", uid: "statusPrioridad" },
        { name: "#", uid: "idPedido" },
        { name: "Nombre", uid: "nombre" },
        { name: "Teléfono", uid: "telefono" },
        { name: "Correo", uid: "correo" },
        { name: "Total", uid: "montoTotal" },
        { name: "F. Entrega", uid: "fechaEntrega" },
        { name: "Entrega", uid: "metodoEntrega" },
        { name: "Pago", uid: "metodoPago" },
        { name: "Prioridad", uid: "prioridad" },
        { name: "Estado", uid: "estado" },
        { name: "Detalle", uid: "detalle" },
    ];

    const onEditarPrioridad = (pedido) => {
        setPedidoSelect(pedido);
        openModalPrioridad();
    };

    const onEditarEstado = (pedido) => {
        setPedidoSelect(pedido);
        openModalEstado();
    };

    //para jalar datos de la bd se usa useEffect y fetch
    useEffect(() => {
        const visualizarPedidosEstados = async () => {
            try {
                console.log("este", idEstado);
                const resp = await fetch(`${apiUrl}/pedido/filtrarPorEstado/${idEstado}`);
                const datos = await resp.json();
                console.log("datos", datos);
                setEstadosPedidos(datos);
            } catch (error) {
                console.error("Error al obtener pedidos por estado", error);
            }
        };
        visualizarPedidosEstados();
    }, [idEstado, refrescar]);

    const renderCell = React.useCallback((pedido, index, columnKey) => {
        const cellValue = pedido[columnKey];

        switch (columnKey) {
            case "statusPrioridad":
                return (
                    <Tooltip color={statusPrioridadColors[pedido.prioridad]} content={`Prioridad ${statusPrioridadNombre[pedido.prioridad]}`}>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <Chip
                                className="capitalize border-none gap-1 text-default-600"
                                color={statusPrioridadColors[pedido.prioridad]}
                                size="sm"
                                variant="dot">
                            </Chip>
                        </span>
                    </Tooltip>
                );
            case "idPedido":
                return <h1>{cellValue}</h1>;
            case "nombre":
                return <h1>{cellValue}</h1>;
            case "telefono":
                return <h1>{cellValue}</h1>;
            case "correo":
                return <h1>{cellValue}</h1>;
            case "montoTotal":
                return <h1>{cellValue}</h1>;
            case "fechaEntrega":
                return <h1>{cellValue}</h1>;
            case "metodoEntrega":
                return <span>{metodoEntrega[cellValue]}</span>;
            case "metodoPago":
                return <span>{metodoPago[cellValue]}</span>;
            case "tipo":
                return <h1>{cellValue}</h1>;
            case "prioridad":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            onClick={() => onEditarPrioridad(pedido)}
                            className="bg-transparent min-w-4"
                            size="sm"
                        >
                            <Tooltip color="danger" content="Editar prioridad">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                    </div>
                );
            case "estado":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            onClick={() => onEditarEstado(pedido)}
                            className="bg-transparent min-w-4"
                            size="sm"
                        >
                            <Tooltip color="danger" content="Editar estado">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                    </div>
                );
            case "detalle":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button href={`/gestion-detallePedido/?idPedido=${pedido.idPedido}`} as={Link} fullWidth radius="full" size="sm" className="bg-transparent min-w-4">
                            <Tooltip color="danger" content="Detalle">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <CgDetailsMore />
                                </span>
                            </Tooltip>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [currentPage, numElementos]);

    // Datos paginados agregado nuevo, segmenta los datos por pagina realizando una copia
    const datosPaginados = estadosPedidos.slice((currentPage - 1) * numElementos, currentPage * numElementos);


    return (
        <Table className="custom-table" isStriped bottomContent={
            <div className="flex w-full justify-center mt-6">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={currentPage} // El valor actual de la página
                    total={Math.max(1, Math.ceil(estadosPedidos.length / numElementos))}//definimos el total
                    onChange={(page) => {
                        setCurrentPage(page); // Actualiza el estado al seleccionar una página
                    }}
                    initialPage={1}//le decimos que inicia en 1
                />
            </div>
        }>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={"center"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody>
                {datosPaginados.map((item, index) => (
                    <TableRow key={item.idPedido} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, index, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaPedidosEstados;