import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { EditIcon } from "../../Iconos/EditIcon";
import { DeleteIcon } from "../../Iconos/DeleteIcon";
import React, { useCallback } from "react";
import { CgInfo } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const TablaProducto = ({ onOpen }) => {
    const detalles = [
        {
            idDetalle: 1,
            nombre: "Pastel de Chocolate",
            tamaño: "Grande",
            cantidad: 2,
            precio: 5000,
            personalizacion: "Felicidades en glaseado",
            tipo: "Pastel",
        },
        {
            idDetalle: 2,
            nombre: "Cupcakes de Vainilla",
            tamaño: "Pequeño",
            cantidad: 12,
            precio: 2000,
            personalizacion: "Con chispas de colores",
            tipo: "Cupcakes",
        },
        {
            idDetalle: 3,
            nombre: "Tarta de Manzana",
            tamaño: "Mediano",
            cantidad: 1,
            precio: 3000,
            personalizacion: "Sin azúcar",
            tipo: "Tarta",
        },
        {
            idDetalle: 4,
            nombre: "Galletas Decoradas",
            tamaño: "Mediano",
            cantidad: 20,
            precio: 2500,
            personalizacion: "Con formas de estrellas",
            tipo: "Galletas",
        },
        {
            idDetalle: 5,
            nombre: "Brownies de Chocolate",
            tamaño: "Grande",
            cantidad: 6,
            precio: 3500,
            personalizacion: "Con nueces",
            tipo: "Brownies",
        }
    ];

    const columns = [
        { name: "#", uid: "idDetalle" },
        { name: "Nombre", uid: "nombre" },
        { name: "Tamaño", uid: "tamaño" },
        { name: "Cantidad", uid: "cantidad" },
        { name: "Precio", uid: "precio" },
        { name: "Personalización", uid: "personalizacion" },
        { name: "Tipo", uid: "tipo" },
    ];

    // Actualiza el método para recibir el detalle completo y mostrar solo la personalización
    const ventanaPersonalizacion = useCallback((detalle) => {
        Swal.fire({
            title: "Personalización",
            html: `<p>${detalle.personalizacion}</p>`, // Solo muestra la personalización
            confirmButtonColor: "#fdc6c6",
        });
    }, []);

    const renderCell = React.useCallback((detalle, columnKey) => {
        const cellValue = detalle[columnKey];

        switch (columnKey) {
            case "idDetalle":
            case "nombre":
            case "tamaño":
            case "cantidad":
            case "precio":
            case "tipo":
                return <h1 style={{ color: "black" }}>{cellValue}</h1>;
            case "personalizacion":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button onClick={() => ventanaPersonalizacion(detalle)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Ver Personalización">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table className="custom-table" isStriped bottomContent={
            <div className="flex w-full justify-center mt-6">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={1}
                    total={5}
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
            <TableBody items={detalles}>
                {(item) => (
                    <TableRow key={item.idDetalle} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TablaProducto;