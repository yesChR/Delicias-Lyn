import GridComponent from "./GridComponent";
import Carrusell from "./ProductHome/CarruselCombos";
import {ScrollShadow} from "@nextui-org/react";
import CarrusellPromociones from "./ProductHome/CarruselPromociones";
const HomeComponent = () => {
    return (
        <div className="p-2 flex flex-col items-center">
            <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
                <Carrusell className="mb-8"></Carrusell>
                <GridComponent />
                <CarrusellPromociones></CarrusellPromociones>
                <GridComponent />
            </ScrollShadow>
        </div>
    );
};

export default HomeComponent;
