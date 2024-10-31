import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import { EditIcon } from "../../Iconos/EditIcon";
import { DeleteIcon } from "../../Iconos/DeleteIcon";
import React, { useCallback } from "react";
import { CgInfo } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import Swal from "sweetalert2";
import { EyeIcon } from "../../Iconos/EyeIcon";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";


const message = () => {
alert("Keyron estuvo aqui💫");
}


const TablaAceptado = ({ onOpenPrioridad, onOpenEstado} ) => {
    
    const pedidos = [
        {
            idAceptado: 1,
            nombre: "Juan Pérez",
            telefono: "8888-8888",
            correo: "juan.perez@example.com",
            monto: 1200,
            fechaEntrega: "2024-11-05",
        },
        {
            idAceptado: 2,
            nombre: "María López",
            telefono: "7777-7777",
            correo: "maria.lopez@example.com",
            monto: 700,
            fechaEntrega: "2024-11-07",
        },
        {
            idAceptado: 3,
            nombre: "Carlos Sánchez",
            telefono: "6666-6666",
            correo: "carlos.sanchez@example.com",
            monto: 300,
            fechaEntrega: "2024-11-10",
        },
        {
            idAceptado: 4,
            nombre: "Ana García",
            telefono: "5555-5555",
            correo: "ana.garcia@example.com",
            monto: 1500,
            fechaEntrega: "2024-11-12",
        },
        {
            idAceptado: 5,
            nombre: "Luis Martínez",
            telefono: "4444-4444",
            correo: "luis.martinez@example.com",
            monto: 200,
            fechaEntrega: "2024-11-15",
        }
    ];

    const columns = [
        { name: "#", uid: "idAceptado" },
        { name: "Nombre", uid: "nombre" },
        { name: "Telefono", uid: "telefono" },
        { name: "Correo", uid: "correo" },
        { name: "Monto", uid: "monto" },
        { name: "Fecha de entrega", uid: "fechaEntrega" },
        { name: "Prioridad", uid: "prioridad" },
        { name: "Estado", uid: "estado" },
        { name: "Detalle", uid: "detalle" },
    ];

    const ventanaEditarPrioridad = useCallback(() => {
        Swal.fire({
            title: "Editar Prioridad",
            html: `
                <select id="prioridad" class="swal2-select">
                    <option value="grande">Alta</option>
                    <option value="mediano">Media</option>
                    <option value="pequeño">Baja</option>
                </select>
            `,
            confirmButtonColor: "#fdc6c6",
        });
    }, []);


     const ventanaEditarEstado = useCallback(() => {
        Swal.fire({
            title: "Editar Estado",
            html: `
                <select id="tamaño" class="swal2-select">
                    <option value="grande">Aceptado</option>
                    <option value="mediano">Pendiente</option>
                    <option value="pequeño">Cancelado</option>
                </select>
            `,
            confirmButtonColor: "#fdc6c6",
        });
    }, []);

    const renderCell = React.useCallback((producto, columnKey) => {
        const cellValue = producto[columnKey];

        switch (columnKey) {
            case "idAceptado": //LES DA COLOR NEGRO
            case "nombre":
            case "telefono":
            case "correo":
            case "monto":
            case "fechaEntrega":
            case "tipo":
                return <h1 style={{color: "black"}}>{cellValue}</h1>;
                case "prioridad":
                    return (
                        <div className="flex items-center justify-center gap-1">
                            <Button 
                                onClick={onOpenPrioridad} // Abre el modal de Prioridad
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
                                onClick={onOpenEstado} // Abre el modal de Estado
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
                            <Button href={"/gestion-detallePedido"} as={Link} fullWidth radius="full" size="sm" className="bg-transparent min-w-4">
                                <Tooltip color="danger" content="Detalle">
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
            <TableBody items={pedidos}>
                {(item) => (
                    <TableRow key={item.idAceptado} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TablaAceptado;