import React, { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import Carrusell from "./ProductHome/CarruselCombos";
import { ScrollShadow } from "@nextui-org/react";
import CarrusellPromociones from "./ProductHome/CarruselPromociones";

const HomeComponent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productos, setProductos] = useState([]);

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

            // console.log(productos);
          
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
        <Carrusell productos={productos} className="mb-8" />
        <GridComponent productos={productos} />
        <CarrusellPromociones productos={productos} />
      </ScrollShadow>
    </div>
  );
};

export default HomeComponent;
