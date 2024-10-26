import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import { BiEditAlt } from "react-icons/bi";
import React, { useCallback } from "react";
import Swal from "sweetalert2";


const TablaSubcategoria = ({ onOpen }) => {
    const subcategorias = [
        {
            idSubcategoria: 1,
            nombreCategoria: "Donas",
            nombreSubcategoria: "Chocolate"
        },
        {
            idSubcategoria: 2,
            nombreCategoria: "Pan",
            nombreSubcategoria: "Salado"
        }
    ];

    const columns = [
        { name: "#", uid: "idSubcategoria" },
        { name: "Subcategoria", uid: "nombreSubcategoria" },
        { name: "Categoria", uid: "nombreCategoria" },
        { name: "Acciones", uid: "acciones" },
    ];

    const ventanaEliminar = useCallback(() => {
        Swal.fire({
            title: "¿Desea eliminar esta subcategoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fdc6c6",
            cancelButtonColor: "#ff6984",
            confirmButtonText: "Sí",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Subcategoría eliminada correctamente!",
                    icon: "success",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }, []);

    const renderCell = React.useCallback((subcategoria, columnKey) => {
        const cellValue = subcategoria[columnKey];

        switch (columnKey) {
            case "idSubcategoria":
                return <h1>{cellValue}</h1>;
            case "nombreSubcategoria":
                return <h1>{cellValue}</h1>;
            case "nombreCategoria":
                return <h1>{cellValue}</h1>;
            case "acciones":
                return (
                    <div className="flex items-center justify-center gap-2">
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
            <TableBody items={subcategorias}>
                {(item) => (
                    <TableRow key={item.idSubcategoria} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TablaSubcategoria;