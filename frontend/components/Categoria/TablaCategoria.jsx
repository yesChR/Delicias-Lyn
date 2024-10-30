import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { EditIcon } from "../Iconos/EditIcon";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import React, { useCallback } from "react";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const TablaCategoria = ({ onOpen }) => {
    const categorias = [
        {
            idCategoria: 1,
            nombre: "Queques",
        },
        {
            idCategoria: 2,
            nombre: "Galletas",
        },
        {
            idCategoria: 3,
            nombre: "Panes",
        },
        {
            idCategoria: 4,
            nombre: "Bocadillos",
        }
    ];

    const columns = [
        { name: "#", uid: "idCategoria" },
        { name: "Nombre", uid: "nombre" },
        { name: "Acciones", uid: "acciones" },
    ];

    const ventanaEliminar = useCallback(() => {
        Swal.fire({
            title: "¿Desea eliminar esta categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fdc6c6",
            cancelButtonColor: "#ff6984",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Categoría eliminada correctamente!",
                    icon: "success",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }, []);

    const renderCell = React.useCallback((categoria, columnKey) => {
        const cellValue = categoria[columnKey];

        switch (columnKey) {
            case "idCategoria":
                return <h1>{cellValue}</h1>;
            case "nombre":
                return <h1>{cellValue}</h1>;
            case "acciones":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button onClick={onOpen} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Editar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                        <Button onClick={ventanaEliminar} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Eliminar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
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
            <TableBody items={categorias}>
                {(item) => (
                    <TableRow key={item.idCategoria} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TablaCategoria;