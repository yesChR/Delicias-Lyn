import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination } from "@nextui-org/react";
import React, { useCallback, useState, useEffect } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { getId } from "../Usuario/AuthService";
import Link from "next/link";

const TablaPedidos = ({ onOpen, setCategoriaSelect, refrescar }) => {
  //aqui tengo el valor de la ruta del .env
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [misPedidos, setMisPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numElementos = 5;

  const metodoEntrega = {
    1: "Presencial",
    2: "Express"
  }

  const metodoPago = {
    1: "Efectivo",
    2: "Sinpe"
  }

  const columns = [
    { name: "#", uid: "idPedido" },
    { name: "Fecha de entrega", uid: "fechaEntrega" },
    { name: "Monto Total", uid: "montoTotal" },
    { name: "Estado", uid: "estado" },
    { name: "Método de entrega", uid: "metodoEntrega" },
    { name: "Método de pago", uid: "metodoPago" },
    { name: "Detalle", uid: "detalle" },
  ];

  const onEditar = (pedido) => {
    setPedidosSelect(pedido);
    onOpen();
  };

  //para jalar datos de la bd se usa useEffect y fetch
  useEffect(() => {
    const visualizarPedidos = async () => {
      try {
        const resp = await fetch(`${apiUrl}/pedido/filtrarPorUsuario/${getId()}`);
        const datos = await resp.json();
        setMisPedidos(datos);
        console.log("user", getId());
      } catch (error) {
        console.error("Error al obtener los pedidos", error);
      }
    };
    visualizarPedidos();
  }, [refrescar]);

  // Renderiza las celdas
  const renderCell = useCallback((pedido, index, columnKey) => {
    const cellValue = pedido[columnKey];

    // Calculamos el índice global considerando la página actual
    const globalIndex = (currentPage - 1) * numElementos + index + 1;

    switch (columnKey) {
      case "idPedido":
        return <span>{cellValue}</span>;
      case "fechaEntrega":
        return <span>{cellValue}</span>;
      case "montoTotal":
        return <span>{cellValue}</span>;
      case "estado":
        // Asegúrate de acceder a la propiedad 'nombre' de estado si 'estado' es un objeto
        return <span>{cellValue ? cellValue.nombre : "Sin estado"}</span>;
      case "metodoEntrega":
        return <span>{metodoEntrega[cellValue]}</span>;
      case "metodoPago":
        return <span>{metodoPago[cellValue]}</span>;
      case "detalle":
        return (
          <div className="flex items-center justify-center gap-1">
            <Button href={`/cliente-detallePedido/?idPedido=${pedido.idPedido}`} as={Link} fullWidth radius="full" size="sm" className="bg-transparent min-w-4">
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
  }, [currentPage, numElementos]); // Asegúrate de que `currentPage` y `numElementos` estén en el array de dependencias

  // Datos paginados agregado nuevo, segmenta los datos por pagina realizando una copia
  const datosPaginados = misPedidos.slice((currentPage - 1) * numElementos, currentPage * numElementos);

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
            page={currentPage} // El valor actual de la página
            total={Math.max(1, Math.ceil(misPedidos.length / numElementos))} // Definimos el total
            onChange={(page) => {
              setCurrentPage(page); // Actualiza el estado al seleccionar una página
            }}
            initialPage={1} // Le decimos que inicia en 1
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
      <TableBody>
        {datosPaginados.map((item, index) => (
          <TableRow key={item.idPedido} className="text-black hover:bg-gray-200 transition duration-300">
            {(columnKey) => <TableCell>{renderCell(item, index, columnKey)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablaPedidos;
