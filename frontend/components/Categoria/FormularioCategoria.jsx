import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormularioCategoria = ({ recargar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    //validaciones para formulario, definir campos
    const schemaCategoria = Yup.object({
        nombre: Yup.string()
            .required("El nombre es requerido")
            .min(3, "Debe tener al menos 3 carácteres")
    });

    const formik = useFormik({
        //como se inicia el valor ejemplo si el input debe tener el nombre por defecto o no
        initialValues: {
            nombre: ""
        },
        validationSchema: schemaCategoria,  // validaciones para formulario
        enableReinitialize: true,  // muestra los cambios conforme escribo en el campo
        onSubmit: async (values) => {
            // Si el formulario es inválido, bloquea boton
            if (!formik.isValid) return;
            try {
                const response = await fetch(`${apiUrl}/categoria/crear`,
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    }
                );
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Categoría creada exitosamente",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    recargar();
                } else {
                    Swal.fire({
                        title: "Ya existe la categoría",
                        icon: "error",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error("Error al crear la categoría", error);
                Swal.fire({
                    title: "Error al crear la categoría",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });

    return (
        <Card>
            <CardBody>
                <form onSubmit={formik.handleSubmit}> {/*ejecuta el onSubmit del formik de arriba */}
                    <div className="p-4">
                        <h2 className="text-principal font-bold text-xl flex justify-center mb-6">Nueva categoría</h2>
                        {/*si tengo varios campos debo hacer varios name con los diferentes nombres que se establecieron en el Schema */}
                        <Input
                            name="nombre"
                            type="text"
                            radius="full"
                            placeholder="Nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.nombre && formik.errors.nombre}
                            errorMessage={formik.errors.nombre}
                        />
                        <div className="w-full mt-6 flex justify-center">
                            <div className="w-1/2">
                                <Button type="submit" radius="full" fullWidth variant="shadow" size="sm" className="bg-principal text-white flex justify-center text-2xs">Crear</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default FormularioCategoria;
