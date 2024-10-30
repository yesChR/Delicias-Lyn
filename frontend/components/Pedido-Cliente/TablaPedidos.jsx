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
import { CgDetailsMore } from "react-icons/cg";

const TablaPedidos = ({ onDetallePedido }) => {
  const [pedidos, setMisPedidos] = useState([
    {
      idPedido: 1,
      fechaEntrega: "2024-11-10",
      montoTotal: 30000,
      estado: "Aceptado",
      metodoEntrega: "Presencial",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
    },
    {
      idPedido: 2,
      fechaEntrega: "2024-11-15",
      montoTotal: 8400,
      estado: "Terminado",
      metodoEntrega: "A domicilio",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
    },
    {
      idPedido: 3,
      fechaEntrega: "2024-11-20",
      montoTotal: 6000,
      estado: "Pendiente de pago",
      metodoEntrega: "Presencial",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
    },
    {
      idPedido: 4,
      fechaEntrega: "2024-11-25",
      montoTotal: 6000,
      estado: "Aceptado",
      metodoEntrega: "Presencial",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
    },
    {
      idPedido: 5,
      fechaEntrega: "2024-12-01",
      montoTotal: 20000,
      estado: "Aceptado",
      metodoEntrega: "Presencial",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
    },
    {
      idPedido: 6,
      fechaEntrega: "2024-12-05",
      montoTotal: 6000,
      estado: "Aceptado",
      metodoEntrega: "Presencial",
      detalle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam officiis fuga nostrum quibusdam sit maxime dolore nobis aperiam corrupti sequi molestiae voluptatibus, atque iure debitis hic reprehenderit harum doloribus. Ducimus?",
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
    { name: "Número pedido", uid: "idPedido" },
    { name: "Fecha de entrega", uid: "fechaEntrega" },
    { name: "Monto Total", uid: "montoTotal" },
    { name: "Estado", uid: "estado" },
    { name: "Método de entrega", uid: "metodoEntrega" },
    { name: "Detalle", uid: "detalle" },
  ];

  const renderCell = (pedidos, columnKey) => {
    const cellValue = pedidos[columnKey];

    switch (columnKey) {
      case "idPedido":
        return <h1>{cellValue}</h1>;
      case "fechaEntrega":
        return <h1>{cellValue}</h1>;
      case "montoTotal":
        return <h1>{cellValue}</h1>;
      case "estado":
        return <h1>{cellValue}</h1>;
      case "metodoEntrega":
        return <h1>{cellValue}</h1>;
      case "detalle":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button
              onClick={() => onDetallePedido(pedidos)}
              className="bg-transparent min-w-4"
              size="sm"
            >
              <Tooltip color="danger" content="Detalle">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <CgDetailsMore />
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
      <TableBody items={pedidos}>
        {(item) => (
          <TableRow
            key={item.idPedido}
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

export default TablaPedidos;
