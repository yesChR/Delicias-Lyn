import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { EditIcon } from "../Iconos/EditIcon";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import React from "react";
import { CgInfo } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";

const TablaCategoria = () => {
    const categorias = [
        {
            idCategoria: 1,
            nombre: "Donas",
        },
        {
            idCategoria: 2,
            nombre: "Pan",
        }
    ];

    const columns = [
        { name: "#", uid: "idCategoria" },
        { name: "Nombre", uid: "nombre" },
        { name: "Acciones", uid: "acciones" },
    ];

    const renderCell = React.useCallback((categoria, columnKey) => {
        const cellValue = categoria[columnKey];

        switch (columnKey) {
            case "idCategoria":
                return <h1>{cellValue}</h1>;
            case "nombre":
                return <h1>{cellValue}</h1>;
            case "acciones":
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip color="danger" content="Editar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <BiEditAlt />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <CgInfo />
                            </span>
                        </Tooltip>
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