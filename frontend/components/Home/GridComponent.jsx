import ProductCard from "./ProductHome/ProductCard";
import {ScrollShadow} from "@nextui-org/react";

const GridComponent = ({ productos }) => {
    return (
      <div className="overflow-y-auto h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 w-3/4 mx-auto">
        {productos.map((producto) => (
          <ProductCard key={producto.idProducto} producto={producto} />
        ))}
      </div>
    );
  };
  
  export default GridComponent;