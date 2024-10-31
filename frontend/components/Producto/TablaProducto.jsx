import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import { EditIcon } from "../Iconos/EditIcon";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import React, { useCallback } from "react";
import { CgInfo } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import Swal from "sweetalert2";
import { EyeIcon } from "../Iconos/EyeIcon";
import { useDisclosure } from "@nextui-org/react";


const message = () => {
alert("Keyron estuvo aqui💫");
}


const TablaProducto = ({ onOpen }) => {
    
    const productos = [
        {
            idProducto: 1,
            nombre: "Pastel de Chocolate",
            categoria: "Repostería",
            subcategoria: "Pasteles",
            tamaño: "Grande",
            precio: 15000, // en colones
            descripcion: "Delicioso pastel de chocolate con relleno de crema.",
            tipo: "Comestible",
            estado: "Disponible",
        },
        {
            idProducto: 2,
            nombre: "Tarta de Frutas",
            categoria: "Repostería",
            subcategoria: "Tartas",
            tamaño: "Mediano",
            precio: 12000, // en colones
            descripcion: "Tarta fresca con una variedad de frutas de temporada.",
            tipo: "Comestible",
            estado: "Disponible",
        },
        {
            idProducto: 3,
            nombre: "Galletas de Avena",
            categoria: "Repostería",
            subcategoria: "Galletas",
            tamaño: "Pequeño",
            precio: 5000, // en colones
            descripcion: "Galletas crujientes de avena con pasas.",
            tipo: "Comestible",
            estado: "Agotado",
        },
        {
            idProducto: 4,
            nombre: "Cupcake de Vainilla",
            categoria: "Repostería",
            subcategoria: "Cupcakes",
            tamaño: "Pequeño",
            precio: 3000, // en colones
            descripcion: "Deliciosos cupcakes de vainilla con glaseado de mantequilla.",
            tipo: "Comestible",
            estado: "Disponible",
        },
    ];

    const columns = [
        { name: "#", uid: "idProducto" },
        { name: "Nombre", uid: "nombre" },
        { name: "Categoria", uid: "categoria" },
        { name: "Subcategoria", uid: "subcategoria" },
        { name: "Tamaño", uid: "tamaño" },
        { name: "Precio", uid: "precio" },
        { name: "Descripcion", uid: "descripcion" },
        { name: "Tipo", uid: "tipo" },
        { name: "Estado", uid: "estado" },
        { name: "Acciones", uid: "acciones" },
    ];

    const ventanaInformacionTamaño = useCallback((producto) => {
        Swal.fire({
            title: "Tamaño",
            html: `<p>${producto.tamaño}</p>`, 
            confirmButtonColor: "#fdc6c6",
        });
    }, []);


     const ventanaInformacionDescripcion = useCallback((producto) => {
        Swal.fire({
            title: "Descripción",
            html: `<p>${producto.descripcion}</p>`, 
            confirmButtonColor: "#fdc6c6",
        });
    }, []);

    const ventanaEliminar = useCallback(() => {
        Swal.fire({
            title: "¿Desea eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fdc6c6",
            cancelButtonColor: "#ff6984",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Producto eliminado correctamente!",
                    icon: "success",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }, []);

    const renderCell = React.useCallback((producto, columnKey) => {
        const cellValue = producto[columnKey];

        switch (columnKey) {
                    case "idProducto": 
                    case "nombre":
                    case "categoria":
                    case "subcategoria":
                    case "precio":
                    case "tipo":
                    case "estado":
                        return <h1 style={{color: "black"}}>{cellValue}</h1>; //LES DA COLOR NEGRO
                    case "tamaño":
                        return (
                        <div className="flex items-center justify-center gap-1">
                        <Button onClick={() => ventanaInformacionTamaño(producto)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Información de Tamaño">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <CgInfo />
                                </span>
                            </Tooltip>
                        </Button>
                        </div>
                    );
                    case "descripcion":
                    return (
                        <div className="flex items-center justify-center gap-1">
                        <Button onClick={() => ventanaInformacionDescripcion(producto)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Información de Producto">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <CgInfo />
                                </span>
                            </Tooltip>
                        </Button>
                        </div>
                    );
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
        <Table
          className="custom-table"
          isStriped
          bottomContent={
            <div className="flex w-full justify-center mt-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="danger"
                page={1}
                total={3}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={"center"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={productos}>
            {(item) => (
              <TableRow
                key={item.idProducto}
                className="text-black hover:bg-gray-200 transition duration-300"
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    };
export default TablaProducto;