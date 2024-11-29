import { Modal, Input, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

const ModalCategoria = ({ isOpen, onOpenChange, categoriaSelect, recargar }) => {
    //aqui tengo el valor de la ruta del .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const schemaCategoria = Yup.object({
        nombre: Yup.string()
            .required("El nombre es requerido")
            .min(3, "Debe tener al menos 3 carácteres")
    });

    const formik = useFormik({
        initialValues: {
            nombre: categoriaSelect ? categoriaSelect.nombre : ""
        },
        validationSchema: schemaCategoria,  // Usamos la validación de Yup
        enableReinitialize: true,  // Permite reinicializar los valores del formulario
        onSubmit: async (values) => {
            // Si el formulario es inválido, bloquea boton
            if (!formik.isValid) return;

            try {
                const response = await fetch(
                    `${apiUrl}/categoria/editar/${categoriaSelect.idCategoria}`,
                    {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    }
                );
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Categoría editada exitosamente",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    recargar();
                    onOpenChange(true);
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
                console.error("Error al editar categorías", error);
                Swal.fire({
                    title: "Error al editar la categoría",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={formik.handleSubmit}>
                            <ModalBody>
                                <div className="p-4 mt-4">
                                    <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar categoría</h2>
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
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button type="submit" color="danger">
                                    Editar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCategoria;