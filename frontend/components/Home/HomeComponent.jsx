import React, { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import Carrusell from "./ProductHome/CarruselCombos";
import { ScrollShadow } from "@nextui-org/react";
import CarrusellPromociones from "./ProductHome/CarruselPromociones";

const HomeComponent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/producto/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
          // console.log(data);
          
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud", error);
      }
    };
    fetchProductos();
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
