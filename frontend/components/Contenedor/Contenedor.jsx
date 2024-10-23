const Contenedor = ({children}) => {
    return (
        <div className="w-full  h-full p-4 flex justify-center">
            <div className="w-full">
                {children} {/*Aqui entran los diferentes componentes que vamos a usar */}
            </div>
        </div>
    );
}

export default Contenedor;