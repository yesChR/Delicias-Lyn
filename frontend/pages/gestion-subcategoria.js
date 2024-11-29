import Contenedor from "@/components/Contenedor/Contenedor";
import Subcategoria from "@/components/Subcategoria/Subcategoria";
import RolePageGuard from '@/components/Guards/RolePageGuard';


const GestionSubcategoriaPage = () => {
    return (
        <Contenedor>
            <RolePageGuard role={0}>

                <Subcategoria></Subcategoria> {/*El children */}
            </RolePageGuard>

        </Contenedor>
    );
}

export default GestionSubcategoriaPage;