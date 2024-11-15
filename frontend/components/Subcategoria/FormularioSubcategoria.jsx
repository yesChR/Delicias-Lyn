import { Card, CardBody } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormularioSubcategoria = ({ recargar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [categorias, setCategorias] = useState([]);  // Estado para almacenar las categorías
    const [loading, setLoading] = useState(true);  // Estado para controlar la carga

    // Cargar las categorías desde la API
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`${apiUrl}/categoria/visualizar`);
                if (response.ok) {
                    const data = await response.json();
                    setCategorias(data);
                } else {
                    Swal.fire({
                        title: "Error al cargar las categorías",
                        icon: "error",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error("Error al obtener categorías", error);
                Swal.fire({
                    title: "Error al obtener categorías",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            } finally {
                setLoading(false);  // Finaliza la carga
            }
        };

        fetchCategorias();
    }, []);

    //validaciones para formulario, definir campos
    const schemaSubcategoria = Yup.object({
        nombre: Yup.string()
            .required("El nombre es requerido")
            .min(3, "Debe tener al menos 3 carácteres"),
        idCategoria: Yup.number().required("Debe seleccionar una categoría")
    });

    const formik = useFormik({
        initialValues: {
            nombre: "",
            idCategoria: ""
        },
        validationSchema: schemaSubcategoria,  // validaciones para formulario
        enableReinitialize: true,  // muestra los cambios conforme escribo en el campo
        onSubmit: async (values) => {
            console.log(values);
            if (!formik.isValid) return;
            try {
                const response = await fetch(`${apiUrl}/subcategoria/crear`,
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    }
                );
                if (response.ok) {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: "success",
                        title: "Subcategoría creada exitosamente",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    recargar();
                } else {
                    Swal.fire({
                        title: "Ya existe la subcategoría",
                        icon: "error",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error("Error al crear la subcategoría", error);
                Swal.fire({
                    title: "Error al crear la subcategoría",
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
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-4">
                        <h2 className="text-principal font-bold text-xl flex justify-center mb-6">Nueva subcategoría</h2>
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
                        {/* Mostrar un Select solo si las categorías están cargadas */}
                        {!loading ? (
                            <Select
                                name="idCategoria"
                                value={formik.values.idCategoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Seleccione categoría"
                                className="max-w-xs mt-4"
                                radius="full"
                                isInvalid={formik.touched.idCategoria && formik.errors.idCategoria}
                                errorMessage={formik.errors.idCategoria}
                            >
                                {categorias.map((categoria) => (
                                    <SelectItem key={categoria.idCategoria} value={categoria.idCategoria}>
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </Select>
                        ) : (
                            <div>Cargando categorías...</div>
                        )}

                        <div className="w-full mt-6 flex justify-center">
                            <div className="w-1/2">
                                <Button
                                    type="submit"
                                    radius="full"
                                    fullWidth
                                    variant="shadow"
                                    size="sm"
                                    className="bg-principal text-white flex justify-center text-2xs"
                                >
                                    Crear
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default FormularioSubcategoria;
