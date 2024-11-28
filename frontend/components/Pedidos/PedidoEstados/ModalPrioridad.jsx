import { Modal, ModalContent, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ModalPrioridad = ({ isOpen, onOpenChange, pedidoSelect, recargar }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const prioridades = [
        { prioridad: 1, nombre: "Baja" },
        { prioridad: 2, nombre: "Media" },
        { prioridad: 3, nombre: "Alta" }
    ];

    const schemaPrioridad = Yup.object({
        prioridad: Yup.number()
            .required("El campo es requerido")
    }); 

    const formik = useFormik({
        initialValues: {
            prioridad: pedidoSelect ? pedidoSelect.prioridad : 1 // Usar el valor seleccionado por defecto
        },
        validationSchema: schemaPrioridad,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log("Values", values);
            if (!formik.isValid) return;
            try {
                const response = await fetch(`${apiUrl}/pedido/editarPrioridad/${pedidoSelect.idPedido}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                });
                if (response.ok) {
                    console.log("resp", response);
                    Swal.fire({
                        icon: "success",
                        title: "Prioridad editada exitosamente",
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        recargar();
                        onOpenChange(false);
                    });
                } else {
                    Swal.fire({
                        title: "No se pudo editar",
                        icon: "error",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error("Error al editar la prioridad", error);
                Swal.fire({
                    title: "Error al editar la prioridad",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    });

    // Manejar el cambio en el Select (Actualizar Formik)
    const handlePrioridadChange = (value) => {
        formik.setFieldValue("prioridad", value);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="p-4 mt-4">
                            <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar Prioridad</h2>
                            <div className="w-full mt-6 flex justify-center">
                                <div className="w-3/4">
                                    <Select
                                        name="prioridad"
                                        value={formik.values.prioridad}
                                        onChange={(e) => handlePrioridadChange(e.target.value)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Seleccione prioridad"
                                        className="max-w-xs mt-4"
                                        radius="full"
                                        isInvalid={formik.touched.prioridad && formik.errors.prioridad}
                                        errorMessage={formik.errors.prioridad}
                                        defaultSelectedKeys={[`${pedidoSelect?.prioridad}`]}
                                    >
                                        {prioridades.map((prioridad) => (
                                            <SelectItem key={prioridad.prioridad} value={prioridad.prioridad}>
                                                {prioridad.nombre}
                                            </SelectItem>
                                        ))}
                                    </Select>
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

export default ModalPrioridad;
