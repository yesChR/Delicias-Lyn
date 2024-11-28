import React, { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import Carrusell from "./ProductHome/CarruselCombos";
import { ScrollShadow } from "@nextui-org/react";
import CarrusellPromociones from "./ProductHome/CarruselPromociones";

const HomeComponent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productos, setProductos] = useState([]);
  const [productosNormales, setProductosNormales] = useState([]);
  const [combos, setCombos] = useState([]);
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    const fetchProductosConTamaños = async () => {
      try {
        const response = await fetch(`${apiUrl}/tamanoXproducto/visualizar`);
        if (response.ok) {
          const data = await response.json();


          // Agrupar productos por idProducto
          const productosAgrupados = {};
          data.forEach(item => {
              const { idProducto } = item.producto;
              
              if (!productosAgrupados[idProducto]) {
                  productosAgrupados[idProducto] = {
                      ...item.producto,
                      tamaños: []
                  };
              }
              productosAgrupados[idProducto].tamaños.push(item.tamaño);
          });

          const productos = Object.values(productosAgrupados);
                setProductos(productos);

          // Filtrar productos por tipo
          const productosNormales = productos.filter(
            (producto) => producto.tipo === 1
          );

          const combosFiltrados = productos.filter(
            producto => producto.tipo === 2
          );
          const promocionesFiltradas = productos.filter(
            producto => producto.tipo === 3
          );

          setProductosNormales(productosNormales);
          setCombos(combosFiltrados);
          setPromociones(promocionesFiltradas);
          
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud", error);
      }
    };
    fetchProductosConTamaños();
  }, []);

  return (
    <div className="p-2 flex flex-col items-center">
      <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
        <Carrusell productos={combos} className="mb-8" />
        <GridComponent productos={productosNormales} />
        <CarrusellPromociones productos={promociones} />
      </ScrollShadow>
    </div>
  );
};

export default HomeComponent;
