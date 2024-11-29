import Productos from "@/components/Producto/Producto";
import Contenedor from "@/components/Contenedor/Contenedor";
import RolePageGuard from '@/components/Guards/RolePageGuard';

const GestionProductoPage = () => {
    return (
        <Contenedor>
            <RolePageGuard role={0}>
                <Productos></Productos>
            </RolePageGuard >

        </Contenedor>
    );
}

export default GestionProductoPage;