import React, { useCallback, useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Pagination,
} from "@nextui-org/react";
import { BiEditAlt } from "react-icons/bi";
import { DeleteIcon } from "../Iconos/DeleteIcon";
import { CgInfo } from "react-icons/cg";
import Swal from "sweetalert2";
import ModalEditarProducto from "./ModalGestionProducto";

const TablaProducto = ({ refrescar }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numElementos = 5;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para abrir el modal de edición
  const openEditModal = (producto) => {
    setSelectedProduct(producto);
    setModalOpen(true);
  };

  // Función para obtener productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await fetch(`${apiUrl}/producto/visualizar`);
        const data = await resp.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, [refrescar]);

  // Función para eliminar un producto
  const ventanaEliminar = useCallback((idProducto) => {
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
        fetch(`${apiUrl}/producto/eliminar/${idProducto}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              setProductos((prevProductos) =>
                prevProductos.filter((producto) => producto.idProducto !== idProducto)
              );
              Swal.fire({
                title: "¡Producto eliminado correctamente!",
                icon: "success",
                confirmButtonColor: "#fdc6c6",
                showConfirmButton: false,
                timer: 1000,
              });
            } else {
              Swal.fire({
                title: "Error al eliminar el producto",
                icon: "error",
                confirmButtonColor: "#fdc6c6",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el producto:", error);
            Swal.fire({
              title: "Error al eliminar el producto",
              icon: "error",
              confirmButtonColor: "#fdc6c6",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      }
    });
  }, []);

  const renderCell = useCallback(
    (producto, columnKey) => {
      const cellValue = producto[columnKey];

      switch (columnKey) {
        case "idProducto":
        case "nombre":
        case "precio":
        case "tipo":
        case "estado":
          return <h1 style={{ color: "black" }}>{cellValue}</h1>;
        case "categoria":
          return <h1 style={{ color: "black" }}>{cellValue?.nombre || "Sin categoría"}</h1>;
        case "subcategoria":
          return <h1 style={{ color: "black" }}>{cellValue?.nombre || "Sin subcategoría"}</h1>;
        case "tamaño":
          return (
            <div className="flex items-center justify-center gap-1">
              <Button
                onClick={() =>
                  Swal.fire({
                    title: "Tamaño",
                    html: `<p>${producto.tamaño || "Sin tamaño especificado"}</p>`,
                    confirmButtonColor: "#fdc6c6",
                  })
                }
                className="bg-transparent min-w-4"
                size="sm"
              >
                <Tooltip color="danger" content="Información de Tamaño">
                  <CgInfo className="text-lg text-danger" />
                </Tooltip>
              </Button>
            </div>
          );
        case "descripcion":
          return (
            <div className="flex items-center justify-center gap-1">
              <Button
                onClick={() =>
                  Swal.fire({
                    title: "Descripción",
                    html: `<p>${producto.descripcion || "Sin descripción"}</p>`,
                    confirmButtonColor: "#fdc6c6",
                  })
                }
                className="bg-transparent min-w-4"
                size="sm"
              >
                <Tooltip color="danger" content="Información de Producto">
                  <CgInfo className="text-lg text-danger" />
                </Tooltip>
              </Button>
            </div>
          );
        case "acciones":
          return (
            <div className="flex items-center justify-center gap-1">
              <Button
                onClick={() => openEditModal(producto)}
                className="bg-transparent min-w-4"
                size="sm"
              >
                <Tooltip color="danger" content="Editar">
                  <BiEditAlt className="text-lg text-danger" />
                </Tooltip>
              </Button>
              <Button
                onClick={() => ventanaEliminar(producto.idProducto)}
                className="bg-transparent min-w-4"
                size="sm"
              >
                <Tooltip color="danger" content="Eliminar">
                  <DeleteIcon className="text-lg text-danger" />
                </Tooltip>
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [ventanaEliminar]
  );

  const datosPaginados = productos.slice(
    (currentPage - 1) * numElementos,
    currentPage * numElementos
  );

  return (
    <>
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
              page={currentPage}
              total={Math.max(1, Math.ceil(productos.length / numElementos))}
              onChange={setCurrentPage}
            />
          </div>
        }
      >
        <TableHeader
          columns={[
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
          ]}
        >
          {(column) => (
            <TableColumn key={column.uid} align={"center"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {datosPaginados.map((item) => (
            <TableRow key={item.idProducto} className="hover:bg-gray-200 transition duration-300">
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEditarProducto
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        modo={true}
        producto={selectedProduct}
      />
    </>
  );
};

export default TablaProducto;
