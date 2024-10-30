import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const FormularioSubcategoria = () => {
    const categorias = [
        {
            idCategoria: 1,
            nombre: "Queques",
        },
        {
            idCategoria: 2,
            nombre: "Galletas",
        },
        {
            idCategoria: 3,
            nombre: "Panes",
        },
        {
            idCategoria: 4,
            nombre: "Bocadillos",
        }
    ];

    const crearSubcategoria = useCallback(() => {
        //crear las condiciones luego
        Swal.fire({
            icon: "success",
            title: "Subcategoría creada exitosamente",
            showConfirmButton: false,
            timer: 1500
        });
    }, [])

    return (
        <Card>
            <CardBody>
                <div className="p-4">
                    <h2 className="text-principal font-bold text-xl flex justify-center mb-6">Nueva subcategoría</h2>
                    <Input type="text" radius="full" placeholder="Nombre" />
                    <Select placeholder="Seleccione categoría" className="max-w-xs mt-4" radius="full">
                        {categorias.map((categorias) => (
                            <SelectItem key={categorias.idCategoria} value={categorias.idCategoria}>
                                {categorias.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className="w-full mt-6 flex justify-center">
                        <div className="w-1/2">
                            <Button onClick={crearSubcategoria} radius="full" fullWidth variant="shadow" size="sm" className="bg-principal text-white flex justify-center text-2xs">Crear</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default FormularioSubcategoria;
