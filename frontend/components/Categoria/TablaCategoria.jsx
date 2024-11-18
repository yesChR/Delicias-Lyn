import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import React, { useCallback, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const TablaCategoria = ({ onOpen, setCategoriaSelect, refrescar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [categorias, setCategorias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numElementos = 5;
    const columns = [
        { name: "#", uid: "idCategoria" },
        { name: "Nombre", uid: "nombre" },
        { name: "Acciones", uid: "acciones" },
    ];

    const onEditar = (categoria) => {
        setCategoriaSelect(categoria);
        onOpen();
    };

    //para jalar datos de la bd se usa useEffect y fetch
    useEffect(() => {
        const visualizarCategorias = async () => {
            try {
                const resp = await fetch(`${apiUrl}/categoria/visualizar`);
                const datos = await resp.json();
                setCategorias(datos);
            } catch (error) {
                console.error("Error al obtener categorías", error);
            }
        };
        visualizarCategorias();
    }, [refrescar]);

    const ventanaEliminar = useCallback((idCategoria) => {
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
                fetch(`${apiUrl}/categoria/eliminar/${idCategoria}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            // Filtrar la categoría eliminada de la lista sin hacer una nueva solicitud a la API
                            setCategorias(prevCategorias => prevCategorias.filter(categoria => categoria.idCategoria !== idCategoria));
                            Swal.fire({
                                title: "Categoría eliminada correctamente!",
                                icon: "success",
                                confirmButtonColor: "#fdc6c6",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        } else {
                            Swal.fire({
                                title: "La categoría contiene subcategorias o productos",
                                icon: "error",
                                confirmButtonColor: "#fdc6c6",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error al eliminar la categoría", error);
                        Swal.fire({
                            title: "Error al eliminar la categoría",
                            icon: "error",
                            confirmButtonColor: "#fdc6c6",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    });
            }
        });
    }, []);

    const renderCell = React.useCallback((categoria, index, columnKey) => {
        const cellValue = categoria[columnKey];
    
        // Calculamos el índice global considerando la página actual
        const globalIndex = (currentPage - 1) * numElementos + index + 1;
    
        switch (columnKey) {
            case "idCategoria":
                return <h1>{globalIndex}</h1>;  // Usamos globalIndex en lugar de index
            case "nombre":
                return <h1>{cellValue}</h1>;
            case "acciones":
                return (
                    <div className="flex items-center justify-center gap-1">
                        <Button onClick={() => onEditar(categoria)} className="bg-transparent min-w-4" size="sm">
                            <Tooltip color="danger" content="Editar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <BiEditAlt />
                                </span>
                            </Tooltip>
                        </Button>
                        <Button onClick={() => ventanaEliminar(categoria.idCategoria)} className="bg-transparent min-w-4" size="sm">
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
    }, [currentPage, numElementos]);  // Asegúrate de que `currentPage` y `numElementos` estén en el array de dependencias
    
    
    // Datos paginados agregado nuevo, segmenta los datos por pagina realizando una copia
    const datosPaginados = categorias.slice((currentPage - 1) * numElementos, currentPage * numElementos);

    return (
        <Table className="custom-table" isStriped bottomContent={
            <div className="flex w-full justify-center mt-6">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="danger"
                    page={currentPage} // El valor actual de la página
                    total={Math.max(1, Math.ceil(categorias.length / numElementos))}//definimos el total
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
            {/*Cambie categorias por datos paginados */}
            <TableBody>
                {datosPaginados.map((item, index) => (
                    <TableRow key={item.idCategoria} className="hover:bg-gray-200 transition duration-300">
                        {(columnKey) => <TableCell>{renderCell(item, index, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TablaCategoria;
