import ProductCard from "./ProductHome/ProductCard";
import {ScrollShadow} from "@nextui-org/react";

const GridComponent = () => {

    return (
        <ScrollShadow hideScrollBar className="w-full max-h-[700px]">
            <div className="overflow-y-auto h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 w-3/4 mx-auto">
                {/* Cada ProductCard está dentro de la cuadrícula */}
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </ScrollShadow>
    );
};

export default GridComponent;