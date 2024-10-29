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
import React, { useState, useEffect } from "react";
import { CgInfo } from "react-icons/cg";
import Swal from "sweetalert2";

const TablaDetalle = () => {
  const [detallePedido, setDetalle] = useState([
    {
      idProducto: 1,
      nombre: "Queque de chocolate",
      tamanio: "Mediano",
      descripcion:
        "Un delicioso queque de chocolate, esponjoso y lleno de sabor, perfecto para cualquier ocasión especial. Preparado con los mejores ingredientes, cacao de alta calidad y decorado con una suave cobertura de crema de chocolate. Ideal para compartir con amigos y familia.",
      personalizacion:
        "Cubierto con glaseado de chocolate y decorado con virutas de chocolate.",
      cantidad: 2,
      precio: 15000,
      monto: 30000,
    },
    {
      idProducto: 2,
      nombre: "Donas",
      tamanio: "Pequeño",
      descripcion:
        "Nuestras donas frescas y suaves están glaseadas con una capa dulce que deleitará tu paladar. Perfectas para acompañar el café de la tarde o para un antojo rápido, estas donas son la combinación ideal de sabor y textura, hechas con cariño en nuestra pastelería.",
      personalizacion:
        "Glaseadas con azúcar y decoradas con confites coloridos.",
      cantidad: 12,
      precio: 700,
      monto: 8400,
    },

    {
      idProducto: 3,
      nombre: "Tres Leches",
      tamanio: "Mediano",
      descripcion:
        "El clásico postre Tres Leches, preparado con una mezcla única de tres tipos de leche, que lo hacen extremadamente suave y jugoso. Su cobertura de crema batida y su sabor perfectamente balanceado lo convierten en una opción irresistible para quienes aman los postres dulces y tradicionales.",
      personalizacion: "Decorado con frutas frescas y un toque de canela.",
      cantidad: 1,
      precio: 6000,
      monto: 6000,
    },
    {
      idProducto: 4,
      nombre: "Rompope",
      tamanio: "1 Litro",
      descripcion:
        "Nuestro rompope artesanal es una deliciosa bebida tradicional, elaborada con leche, huevos frescos, azúcar y un toque de licor. Su sabor suave y cremoso es perfecto para disfrutar en reuniones familiares o para darle un toque especial a tus postres favoritos.",
      personalizacion:
        "Añadido un toque extra de canela para un sabor más intenso.",
      cantidad: 2,
      precio: 3000,
      monto: 6000,
    },

    {
      idProducto: 5,
      nombre: "Queque relleno melocotón",
      tamanio: "Grande",
      descripcion:
        "Un exquisito queque relleno de melocotón que combina la suavidad del bizcocho con la frescura de la fruta. Cada bocado está lleno de sabor gracias al relleno de melocotón dulce y jugoso, cubierto con una delicada capa de glaseado. Perfecto para celebraciones especiales y ocasiones únicas.",
      personalizacion:
        "Relleno extra de melocotón y decorado con rodajas de fruta fresca.",
      cantidad: 1,
      precio: 20000,
      monto: 20000,
    },
    {
      idProducto: 6,
      nombre: "Cupcake",
      tamanio: "Normal",
      descripcion:
        "Pequeños pero llenos de sabor, nuestros cupcakes están decorados con un suave glaseado y elaborados con los ingredientes más frescos. Perfectos para cualquier ocasión, estos cupcakes son el equilibrio ideal entre un bizcocho esponjoso y un dulce toque de crema que no te dejará indiferente.",
      personalizacion:
        "Decorados con glaseado de vainilla y chispas de colores.",
      cantidad: 5,
      precio: 1200,
      monto: 6000,
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
    { name: "Descripción", uid: "descripcion" },
    { name: "Personalización", uid: "personalizacion" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Precio", uid: "precio" },
    { name: "Monto", uid: "monto" },
  ];

  const ventanaDescripcion = (detallePedido) => {
    Swal.fire({
      title: `${detallePedido.nombre}`,
      text: detallePedido.descripcion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const ventanaPersonalizacion = (detallePedido) => {
    Swal.fire({
      title: `${detallePedido.nombre}`,
      text: detallePedido.personalizacion,
      icon: "info",
      confirmButtonColor: "#ff6984",
      confirmButtonText: "Ok",
    });
  };

  const renderCell = (detallePedido, columnKey) => {
    const cellValue = detallePedido[columnKey];

    switch (columnKey) {
      case "idProducto":
        return <h1>{cellValue}</h1>;
      case "nombre":
        return <h1>{cellValue}</h1>;
      case "tamanio":
        return <h1>{cellValue}</h1>;
      case "descripcion":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              onClick={() => ventanaDescripcion(detallePedido)}
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Descripción">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <CgInfo />
                </span>
              </Tooltip>
            </Button>
          </div>
        );
      case "personalizacion":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              onClick={() => ventanaPersonalizacion(detallePedido)}
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Personalización">
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
  };

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
      <TableBody items={detallePedido}>
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

export default TablaDetalle;
