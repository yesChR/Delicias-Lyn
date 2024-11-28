import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { EditIcon } from "../../Iconos/EditIcon";
import { DeleteIcon } from "../../Iconos/DeleteIcon";
import React, { useCallback, useState, useEffect } from "react";
import { CgInfo } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const TablaProducto = ({ onOpen, pedido, refrescar }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [detalles, setDetalles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const numElementos = 5;

    const columns = [
        { name: "#", uid: "idDetalle" },
        { name: "Nombre", uid: "nombre" },
        { name: "Tamaño", uid: "tamaño" },
        { name: "Cantidad", uid: "cantidad" },
        { name: "Precio", uid: "precio" },
        { name: "Personalización", uid: "personalizacion" },
        { name: "Tipo", uid: "tipo" },
    ];

    const tipos = {
        1: "Producto",
        2: "Combo",
        3: "Promoción"
    };

    // Actualiza el método para recibir el detalle completo y mostrar solo la personalización
    const ventanaPersonalizacion = useCallback((detalle) => {
        Swal.fire({
            title: "Personalización",
            html: `<p>${detalle.personalizacion}</p>`, // Solo muestra la personalización
            confirmButtonColor: "#fdc6c6",
        });
    }, []);

    //para jalar datos de la bd se usa useEffect y fetch
    useEffect(() => {
        if (pedido?.detalle) {
            console.log("Detalle actualizado:", pedido.detalle);
            setDetalles(pedido.detalle);
        }
    }, [pedido]);

    console.log("identificar", pedido);

    const renderCell = React.useCallback((detalle, index, columnKey) => {
        // Calculamos el índice global considerando la página actual
        const globalIndex = (currentPage - 1) * numElementos + index + 1;
        switch (columnKey) {
            case "idDetalle":
                return <h1>{globalIndex}</h1>;
            case "nombre":
                return <h1>{detalle.producto.nombre}</h1>;
            case "tamaño":
                return <h1>{detalle.tamaño.nombre}</h1>;
            case "cantidad":
                return <h1>{detalle.cantidad}</h1>;
            case "precio":
                return <h1>{detalle.producto.precio}</h1>;
            case "tipo":
                return <h1>{tipos[detalle.producto.tipo]}</h1>;
            case "personalizacion":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button onClick={() => ventanaPersonalizacion(detalle)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Ver Personalización">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <CgInfo />
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
    console.log(pedido);
    const datosPaginados = detalles.slice((currentPage - 1) * numElementos, currentPage * numElementos);

    return (
        <Table className="custom-table" isStriped bottomContent={
            <div className="flex w-full justify-center mt-6">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={currentPage} // El valor actual de la página
                    total={Math.max(1, Math.ceil(detalles.length / numElementos))}//definimos el total
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
                    <TableRow key={index} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, index, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaProducto;