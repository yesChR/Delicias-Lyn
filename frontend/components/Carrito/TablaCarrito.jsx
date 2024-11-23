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
import { DeleteIcon } from "../Iconos/DeleteIcon";
import React, { useState, useEffect } from "react";
import { CgInfo } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import Swal from "sweetalert2";

const TablaCarrito = ({ onOpen }) => {
  //ApiURL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [carrito, setCarrito] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numElementos = 5;

  const columns = [
    { name: "# Producto", uid: "idProducto" },
    { name: "Nombre", uid: "nombre" },
    { name: "Tamaño", uid: "tamaño" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Precio", uid: "precio" },
    { name: "Total", uid: "montoXCantidad" },
    { name: "Acciones", uid: "acciones" },
  ];

  //No borrar sino da error de hidratacion del HTML xD
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await fetch(`${apiUrl}/carrito/visualizar/2`);
        if (response.ok) {
          const data = await response.json();
          setCarrito(data);
        }
      } catch (error) {
        console.error("Error al cargar los productos del carrito", error);
      }
    };
    fetchCarrito();
  }, []);

  // console.log(carrito[0].idUsuario);
  // console.log(carrito[0].idProducto);

  //No borrar sino da error de hidratacion del HTML xD
  if (!isClient) {
    return <div>Cargando...</div>;
  }

  const ventanaEliminar = (idUsuario, idProducto) => {
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
        fetch(`${apiUrl}/carrito/eliminar/${idUsuario}/${idProducto}`, {
          method: "DELETE",
        })
        .then((response) => {
          if (response.ok) {
            setCarrito((prevCarrito) => {
              const updatedCarrito = prevCarrito.filter(
                (item) => item.idProducto !== idProducto
              );

              //Para que actualice mejor si la paginación se queda sin elementos al eliminar
              const maxPage = Math.max(1, Math.ceil(updatedCarrito.length / numElementos));
              if (currentPage > maxPage) {
                setCurrentPage(maxPage);
              }

              return updatedCarrito;
            });



              Swal.fire({
                title: "Producto eliminado correctamente!",
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
            console.error("Error al eliminar el producto", error);
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
  };

  const ventanaDescripcion = (carrito) => {
    Swal.fire({
      title: `${carrito.producto.nombre}`,
      text: carrito.producto.descripcion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const ventanaPersonalizacion = (carrito) => {
    Swal.fire({
      title: `${carrito.producto.nombre}`,
      text: carrito.personalizacion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const modificarCantidad = async (idUsuario, idProducto, operacion) => {
    try {
      // Encontrar el producto en el carrito para obtener la cantidad actual
      const producto = carrito.find((item) => item.idProducto === idProducto);
      if (!producto) return;

      let nuevaCantidad = producto.cantidad;

      if (operacion === "incrementar") {
        nuevaCantidad += 1;
      } else if (operacion === "decrementar" && nuevaCantidad > 1) {
        nuevaCantidad -= 1;
      } else {
        return;
      }

      const response = await fetch(`${apiUrl}/carrito/editar/${idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario, nuevaCantidad }),
      });

      if (response.ok) {
        const data = await response.json();

        setCarrito((prevCarrito) =>
          prevCarrito.map((item) =>
            item.idProducto === idProducto
              ? {
                  ...item,
                  cantidad: data.cantidad,
                  montoXCantidad: data.montoXCantidad,
                }
              : item
          )
        );
      } else {
        console.error(
          "Error al actualizar la cantidad del producto en el carrito"
        );
      }
    } catch (error) {
      console.error(
        "Error al actualizar la cantidad del producto en el carrito",
        error
      );
    }
  };

  const renderCell = (carrito, index, columnKey) => {
    // Calculamos el índice global considerando la página actual
    const globalIndex = (currentPage - 1) * numElementos + index + 1;

    switch (columnKey) {
      case "id":
        return <h1>{globalIndex}</h1>;
      case "nombre":
        return <h1>{carrito.producto.nombre}</h1>;
      case "tamaño":
        return <h1>{carrito.tamaño.nombre}</h1>;
      case "cantidad":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              className="bg-transparent min-w-4"
              size="sm"
              onClick={() =>
                modificarCantidad(
                  carrito.idUsuario,
                  carrito.idProducto,
                  "decrementar"
                )
              }
            >
              <Tooltip color="danger" content="Quitar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaMinus />
                </span>
              </Tooltip>
            </Button>

            <div className="w-10 text-center">
              <h1>{carrito.cantidad}</h1>
            </div>

            <Button
              className="bg-transparent min-w-4"
              size="sm"
              onClick={() =>
                modificarCantidad(
                  carrito.idUsuario,
                  carrito.idProducto,
                  "incrementar"
                )
              }
            >
              <Tooltip color="danger" content="Agregar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaPlus />
                </span>
              </Tooltip>
            </Button>
          </div>
        );
      case "precio":
        return <h1>{carrito.producto.precio}</h1>;
      case "monto":
        return <h1>{carrito.montoXCantidad}</h1>;
      case "acciones":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              onClick={() => ventanaDescripcion(carrito)}
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Descripción">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <CgInfo />
                </span>
              </Tooltip>
            </Button>

            <Button
              onClick={() => ventanaPersonalizacion(carrito)}
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Personalización">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdOutlineDescription />
                </span>
              </Tooltip>
            </Button>

            <Button
              onClick={() =>
                ventanaEliminar(carrito.idUsuario, carrito.idProducto)
              }
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Eliminar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </Button>
          </div>
        );
      default:
        return carrito[columnKey];
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.montoXCantidad, 0);
  };

  return (
    <div>
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
              total={Math.max(1, Math.ceil(carrito.length / numElementos))}
              onChange={(page) => setCurrentPage(page)}
              initialPage={1}
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
        <TableBody
          items={carrito.slice(
            (currentPage - 1) * numElementos,
            currentPage * numElementos
          )}
        >
          {(item, index) => (
            <TableRow
              key={item.id}
              className="text-black hover:bg-gray-200 transition duration-300"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, index, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4 p-4 border-t">
        <div className="text-xl font-bold">
          Total a pagar: ₡{calcularTotal().toLocaleString()}
        </div>

        <Button color="danger" size="lg" onClick={onOpen}>
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default TablaCarrito;
