import Categoria from "@/components/Categoria/Categoria";
import Contenedor from "@/components/Contenedor/Contenedor";
import RolePageGuard from '@/components/Guards/RolePageGuard';


const GestionCategoriaPage = () => {
    return (
        <Contenedor>
            <RolePageGuard role={0}>
                <Categoria></Categoria>
            </RolePageGuard>
        </Contenedor>
    );
}

export default GestionCategoriaPage;