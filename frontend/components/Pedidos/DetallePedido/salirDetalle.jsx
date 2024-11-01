import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const SalirDetalle = ({ setMostrarTablaDetalles }) => {
    const salir = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Saliendo de los detalles...",
            showConfirmButton: false,
            timer: 1000
        }).then(() => {
            setMostrarTablaDetalles(false);
        });
    }, [setMostrarTablaDetalles]);

    return (
        <div className="flex justify-end w-full">
            <Button 
                href={"/gestion-aceptado"} 
                as={Link} 
                fullWidth={false} // Asegúrate de que no ocupe todo el ancho
                radius="full" 
                size="lg" // Cambia el tamaño a "lg" como el botón Crear
                className="bg-principal text-white text-2xs mr-4" // Ajusta la clase para que se vea igual
            >
                Regresar
            </Button>
        </div>
    );
};

export default SalirDetalle;
