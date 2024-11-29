import Contenedor from "@/components/Contenedor/Contenedor";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {ScrollShadow} from "@nextui-org/react";
import GridComponent from "@/components/Categoria-Productos/GridComponent";

const LupaPage = () => {
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState(searchParams?.get("nombre"));
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const nombreParam = searchParams?.get("nombre");
    if (nombreParam) {
      setNombre(nombreParam);
      console.log("nombre", nombre);
    }
  }, [searchParams]);
  useEffect(() => {
    if (nombre) {
      const fetchProductosPorNombre = async () => {
        try {
          const response = await fetch(`${apiUrl}/tamanoXproducto/filtrar/nombre/${nombre}`);
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

          } else {
            console.error("Error al cargar los productos");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud para obtener los productos", error);
        }
      };
      fetchProductosPorNombre();
    }
  }, [nombre]);


  return (
    <Contenedor>
      <div className="p-2 flex flex-col items-center">
        <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
          <GridComponent productos={productos} />
        </ScrollShadow>
      </div>
    </Contenedor>
  );
};

export default LupaPage;