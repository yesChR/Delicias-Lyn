import GridComponent from "./GridComponent";
import {ScrollShadow} from "@nextui-org/react";

const CategoriaProducto = () => {
    return (
        <div className="p-2 flex flex-col items-center">
            <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
                <GridComponent />
                <GridComponent />
            </ScrollShadow>
        </div>
    );
};

export default CategoriaProducto;
