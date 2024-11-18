import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import { BiEditAlt } from "react-icons/bi";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const TablaSubcategoria = ({ onOpen, setSubcategoriaSelect, refrescar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [subcategorias, setSubcategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numElementos = 5;

    const columns = [
        { name: "#", uid: "idSubcategoria" },
        { name: "Subcategoria", uid: "nombre" },
        { name: "Categoria", uid: "categoria" },
        { name: "Acciones", uid: "acciones" },
    ];

    const onEditar = (subcategoria) => {
        setSubcategoriaSelect(subcategoria);
        onOpen();
    };

    //para jalar datos de la bd se usa useEffect y fetch
    useEffect(() => {
        const visualizarSubcategorias = async () => {
            try {
                const resp = await fetch(`${apiUrl}/subcategoria/visualizar`);
                const datos = await resp.json();
                console.log("aquiii", datos);
                setSubcategorias(datos);
            } catch (error) {
                console.error("Error al obtener subcategorías", error);
            }
        };
        visualizarSubcategorias();
    }, [refrescar]);

    const ventanaEliminar = useCallback((idSubcategoria) => {
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
                fetch(`${apiUrl}/subcategoria/eliminar/${idSubcategoria}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            // Filtrar la categoría eliminada de la lista sin hacer una nueva solicitud a la API
                            setSubcategorias(prevSubcategorias => prevSubcategorias.filter(subcategoria => subcategoria.idSubcategoria !== idSubcategoria));
                            Swal.fire({
                                title: "Subcategoría eliminada correctamente!",
                                icon: "success",
                                confirmButtonColor: "#fdc6c6",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        } else {
                            Swal.fire({
                                title: "La subcategoría contiene productos",
                                icon: "error",
                                confirmButtonColor: "#fdc6c6",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error al eliminar la subcategoría", error);
                        Swal.fire({
                            title: "Error al eliminar la subcategoría",
                            icon: "error",
                            confirmButtonColor: "#fdc6c6",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    });
            }
        });
    }, []);

    const renderCell = React.useCallback((subcategoria,index, columnKey) => {

        const cellValue = subcategoria[columnKey];
        // Calculamos el índice global considerando la página actual
        const globalIndex = (currentPage - 1) * numElementos + index + 1;
        switch (columnKey) {
            case "idSubcategoria":
                return <h1>{globalIndex}</h1>;
            case "nombre":
                return <h1>{cellValue}</h1>;
            case "categoria":
                return <h1>{cellValue.nombre}</h1>;
            case "acciones":
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button onClick={() => onEditar(subcategoria)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Editar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                        <Button onClick={() => ventanaEliminar(subcategoria.idSubcategoria)} className="bg-transparent min-w-4" size="sm">
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
    }, [currentPage, numElementos]);

    // Datos paginados agregado nuevo, segmenta los datos por pagina realizando una copia
    const datosPaginados = subcategorias.slice((currentPage - 1) * numElementos, currentPage * numElementos);


    return (
        <Table className="custom-table" isStriped bottomContent={
            <div className="flex w-full justify-center mt-6">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={currentPage} // El valor actual de la página
                    total={Math.max(1, Math.ceil(subcategorias.length / numElementos))}//definimos el total
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
                    <TableRow key={item.idSubcategoria} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, index, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaSubcategoria;