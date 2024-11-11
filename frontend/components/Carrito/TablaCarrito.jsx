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
  const [carrito, setCarrito] = useState([
    {
      idProducto: 1,
      nombre: "Queque de chocolate",
      tamanio: "Mediano",
      cantidad: 2,
      precio: 15000,
      monto: 30000,
      descripcion:
        "Un delicioso queque de chocolate, esponjoso y lleno de sabor, perfecto para cualquier ocasión especial. Preparado con los mejores ingredientes, cacao de alta calidad y decorado con una suave cobertura de crema de chocolate. Ideal para compartir con amigos y familia.",
      personalizacion:
        "Cubierto con glaseado de chocolate y decorado con virutas de chocolate.",
    },
    {
      idProducto: 2,
      nombre: "Donas",
      tamanio: "Pequeño",
      cantidad: 12,
      precio: 700,
      monto: 8400,
      descripcion:
        "Nuestras donas frescas y suaves están glaseadas con una capa dulce que deleitará tu paladar. Perfectas para acompañar el café de la tarde o para un antojo rápido, estas donas son la combinación ideal de sabor y textura, hechas con cariño en nuestra pastelería.",
      personalizacion:
        "Glaseadas con azúcar y decoradas con confites coloridos.",
    },
    {
      idProducto: 3,
      nombre: "Tres Leches",
      tamanio: "Mediano",
      cantidad: 1,
      precio: 6000,
      monto: 6000,
      descripcion:
        "El clásico postre Tres Leches, preparado con una mezcla única de tres tipos de leche, que lo hacen extremadamente suave y jugoso. Su cobertura de crema batida y su sabor perfectamente balanceado lo convierten en una opción irresistible para quienes aman los postres dulces y tradicionales.",
      personalizacion: "Decorado con frutas frescas y un toque de canela.",
    },
    {
      idProducto: 4,
      nombre: "Rompope",
      tamanio: "1 Litro",
      cantidad: 2,
      precio: 3000,
      monto: 6000,
      descripcion:
        "Nuestro rompope artesanal es una deliciosa bebida tradicional, elaborada con leche, huevos frescos, azúcar y un toque de licor. Su sabor suave y cremoso es perfecto para disfrutar en reuniones familiares o para darle un toque especial a tus postres favoritos.",
      personalizacion:
        "Añadido un toque extra de canela para un sabor más intenso.",
    },
    {
      idProducto: 5,
      nombre: "Queque relleno melocotón",
      tamanio: "Grande",
      cantidad: 1,
      precio: 20000,
      monto: 20000,
      descripcion:
        "Un exquisito queque relleno de melocotón que combina la suavidad del bizcocho con la frescura de la fruta. Cada bocado está lleno de sabor gracias al relleno de melocotón dulce y jugoso, cubierto con una delicada capa de glaseado. Perfecto para celebraciones especiales y ocasiones únicas.",
      personalizacion:
        "Relleno extra de melocotón y decorado con rodajas de fruta fresca.",
    },
    {
      idProducto: 6,
      nombre: "Cupcake",
      tamanio: "Normal",
      cantidad: 5,
      precio: 1200,
      monto: 6000,
      descripcion:
        "Pequeños pero llenos de sabor, nuestros cupcakes están decorados con un suave glaseado y elaborados con los ingredientes más frescos. Perfectos para cualquier ocasión, estos cupcakes son el equilibrio ideal entre un bizcocho esponjoso y un dulce toque de crema que no te dejará indiferente.",
      personalizacion:
        "Decorados con glaseado de vainilla y chispas de colores.",
    },
  ]);

  //No borrar sino da error de hidratacion del HTML xD
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  //No borrar sino da error de hidratacion del HTML xD
  if (!isClient) {
    return <div>Cargando...</div>;
  }

  const columns = [
    { name: "# Producto", uid: "idProducto" },
    { name: "Nombre", uid: "nombre" },
    { name: "Tamaño", uid: "tamanio" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Precio", uid: "precio" },
    { name: "Total", uid: "monto" },
    { name: "Acciones", uid: "acciones" },
  ];

  const ventanaEliminar = () => {
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
          title: "Producto eliminado correctamente!",
          icon: "success",
          confirmButtonColor: "#fdc6c6",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const ventanaDescripcion = (producto) => {
    Swal.fire({
      title: `${producto.nombre}`,
      text: producto.descripcion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const ventanaPersonalizacion = (producto) => {
    Swal.fire({
      title: `${producto.nombre}`,
      text: producto.personalizacion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const modificarCantidad = (idProducto, operacion) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) => {
        if (item.idProducto === idProducto) {
          let nuevaCantidad = item.cantidad;

          if (operacion === "incrementar") {
            nuevaCantidad += 1;
          } else if (operacion === "decrementar" && item.cantidad > 1) {
            nuevaCantidad -= 1;
          }

          return {
            ...item,
            cantidad: nuevaCantidad,
            monto: nuevaCantidad * item.precio,
          };
        }
        return item;
      })
    );
  };

  const renderCell = (carrito, columnKey) => {
    const cellValue = carrito[columnKey];

    switch (columnKey) {
      case "idProducto":
        return <h1>{cellValue}</h1>;
      case "nombre":
        return <h1>{cellValue}</h1>;
      case "tamanio":
        return <h1>{cellValue}</h1>;
      case "cantidad":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              className="bg-transparent min-w-4"
              size="sm"
              onClick={() =>
                modificarCantidad(carrito.idProducto, "decrementar")
              }
            >
              <Tooltip color="danger" content="Quitar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaMinus />
                </span>
              </Tooltip>
            </Button>

            <div className="w-10 text-center">
              <h1>{cellValue}</h1>
            </div>

            {/* <h1 className="ml-2 mr-2">{cellValue}</h1> */}
            <Button
              className="bg-transparent min-w-4"
              size="sm"
              onClick={() =>
                modificarCantidad(carrito.idProducto, "incrementar")
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
        return <h1>{cellValue}</h1>;
      case "monto":
        return <h1>{cellValue}</h1>;
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
              onClick={ventanaEliminar}
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
        return cellValue;
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.monto, 0);
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
        <TableBody items={carrito}>
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
