import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";

const FormularioCategoria = () => {
    return (
        <Card>
            <CardBody>
                <div className="p-4">
                    <h2 className="text-principal font-bold text-xl flex justify-center mb-6">Nueva categoría</h2>
                    <Input type="text" radius="full" placeholder="Nombre" />
                    <div className="w-full mt-6 flex justify-center">
                        <div className="w-1/2">
                            <Button radius="full" fullWidth variant="shadow" size="sm" className="bg-principal text-white flex justify-center text-2xs">Crear</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default FormularioCategoria;
