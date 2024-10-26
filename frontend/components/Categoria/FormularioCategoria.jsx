import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const FormularioCategoria = () => {
    const crearCategoria = useCallback(() => {
        //crear las condiciones luego
        Swal.fire({
            icon: "success",
            title: "Categoría creada exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, [])

    return (
        <Card>
            <CardBody>
                <div className="p-4">
                    <h2 className="text-principal font-bold text-xl flex justify-center mb-6">Nueva categoría</h2>
                    <Input type="text" radius="full" placeholder="Nombre" />
                    <div className="w-full mt-6 flex justify-center">
                        <div className="w-1/2">
                            <Button onClick={crearCategoria} radius="full" fullWidth variant="shadow" size="sm" className="bg-principal text-white flex justify-center text-2xs">Crear</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default FormularioCategoria;
