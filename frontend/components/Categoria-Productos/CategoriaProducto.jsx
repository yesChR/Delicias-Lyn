import { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import {ScrollShadow} from "@nextui-org/react";
import { useRouter } from 'next/router'; 

const CategoriaProducto = () => {

    const router = useRouter();
    const { idSubcategoria } = router.query;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (idSubcategoria) {
          const fetchProductosPorSubcategoria = async () => {
            try {
              const response = await fetch(`${apiUrl}/tamanoXproducto/filtrar/subcategoria/${idSubcategoria}`);
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
                console.log("Productos filtrados por subcategoría:", productosAplanados);
              } else {
                console.error("Error al cargar los productos de la subcategoría");
              }
            } catch (error) {
              console.error("Error al realizar la solicitud para obtener los productos", error);
            }
          };
          fetchProductosPorSubcategoria();
        }
      }, [idSubcategoria]);

    return (
        <div className="p-2 flex flex-col items-center">
            <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
                <GridComponent productos={productos} />
            </ScrollShadow>
        </div>
    );
};

export default CategoriaProducto;
