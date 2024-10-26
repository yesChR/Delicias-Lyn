import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";

const FormularioSubcategoria = () => {
    const subcategorias = [
        {
            idSubcategoria: 1,
            nombreCategoria: "Donas",
            nombreSubcategoria: "Chocolate"
        },
        {
            idSubcategoria: 2,
            nombreCategoria: "Pan",
            nombreSubcategoria: "Salado"
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
                        {subcategorias.map((subcategoria) => (
                            <SelectItem key={subcategoria.idSubcategoria} value={subcategoria.idSubcategoria}>
                                {subcategoria.nombreSubcategoria}
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
