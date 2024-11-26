import Contenedor from "@/components/Contenedor/Contenedor";
import Informe from "@/components/Informe/Informe";  // Componente Informe

const GestionInformePage = () => {
    return (
        <Contenedor>
            <Informe /> {/* El children*/}
        </Contenedor>
    );
}

export default GestionInformePage;
