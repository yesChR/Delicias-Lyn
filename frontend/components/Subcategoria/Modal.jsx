import { Modal, ModalContent, Input, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalSubcategoria = ({ isOpen, onOpenChange, subcategoriaSelect, recargar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const schemaSubcategoria = Yup.object({
        nombre: Yup.string()
            .required("El nombre es requerido")
            .min(3, "Debe tener al menos 3 carácteres"),
        idCategoria: Yup.number().required("Debe seleccionar una categoría")
    });

    // Inicializar Formik con los valores de la subcategoría seleccionada
    const formik = useFormik({
        initialValues: {
            nombre: subcategoriaSelect ? subcategoriaSelect.nombre : "",
            idCategoria: subcategoriaSelect ? subcategoriaSelect.idCategoria : "" // Asegúrate de que se pasa el idCategoria
        },
        validationSchema: schemaSubcategoria,
        enableReinitialize: true, // Esto asegura que los valores cambien cuando `subcategoriaSelect` cambie
        onSubmit: async (values) => {
            console.log("Values", values);
            if (!formik.isValid) return;
            try {
                const response = await fetch(`${apiUrl}/subcategoria/editar/${subcategoriaSelect.idSubcategoria}/${values.idCategoria}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                }); console.log("Values2", values);
                if (response.ok) {
                    console.log("resp", response);
                    Swal.fire({
                        icon: "success",
                        title: "Subcategoría editada exitosamente",
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        recargar();
                        onOpenChange(false); // Cerrar el modal después de editar
                    });
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
                console.error("Error al editar subcategoría", error);
                Swal.fire({
                    title: "Error al editar la subcategoría",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });

    // Manejar el cambio en el Select (Actualizar Formik)
    const handleCategoryChange = (value) => {
        console.log(value);
        formik.setFieldValue("idCategoria", value.target.value); // Actualizar el valor de idCategoria en Formik
        console.log("MIRAR", value.target.value);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="p-4 mt-4">
                            <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar subcategoría</h2>
                            <div className="w-full mt-6 flex justify-center">
                                <div className="w-3/4">
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
                                            value={formik.values.idCategoria}  // Vincular el valor de idCategoria
                                            onChange={handleCategoryChange}   // Usar la función personalizada
                                            onBlur={formik.handleBlur}
                                            placeholder="Seleccione categoría"
                                            className="max-w-xs mt-4"
                                            radius="full"
                                            isInvalid={formik.touched.idCategoria && formik.errors.idCategoria}
                                            errorMessage={formik.errors.idCategoria}
                                            defaultSelectedKeys={[`${subcategoriaSelect?.idCategoria}`]}
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
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                            Cerrar
                        </Button>
                        <Button type="submit" color="danger">
                            Editar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ModalSubcategoria;
