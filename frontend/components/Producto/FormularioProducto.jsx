import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const FormularioProducto = () => {
    const crearProducto = useCallback(() => {
        //crear las condiciones luego
        Swal.fire({
            icon: "success",
            title: "Producto creado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, [])
    return (
    <Button onClick={crearProducto} radius="full" fullWidth variant="shadow" size="sm" className="bg-principal text-white flex justify-center text-2xs">Crear</Button>
    );
}

export default FormularioProducto;
