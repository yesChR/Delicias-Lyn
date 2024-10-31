import {ScrollShadow} from "@nextui-org/react";
const Contenedor = ({children}) => {
    return (
        <div className="w-full  h-full p-4 flex justify-center">
        <ScrollShadow hideScrollBar className="w-full max-h-[700px]" size={8}>
            <div className="w-full">
                {children} {/*Aqui entran los diferentes componentes que vamos a usar */}
            </div>
            </ScrollShadow>
        </div>
    );
}

export default Contenedor;