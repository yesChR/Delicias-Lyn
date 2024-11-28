import { Modal, ModalContent, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalEstado = ({ isOpen, onOpenChange, pedidoSelect, recargar }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [estados, setEstados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Cargar estados desde la API
    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await fetch(`${apiUrl}/estado/visualizar`);
                if (response.ok) {
                    const data = await response.json();
                    setEstados(data);
                } else {
                    Swal.fire({
                        title: "Error al cargar los estados",
                        icon: "error",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error("Error al obtener los estados", error);
                Swal.fire({
                    title: "Error al obtener los estados",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        };
        fetchEstados();
    }, []);

    const schemaEstado = Yup.object({
        idEstado: Yup.number()
            .required("El campo es requerido")
    });

    const formik = useFormik({
        initialValues: {
            idEstado: pedidoSelect ? pedidoSelect.idEstado : 1 // Usar el valor seleccionado por defecto
        },
        validationSchema: schemaEstado,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log("Values", values);
            if (!formik.isValid) return;
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/pedido/editarEstado/${pedidoSelect.idPedido}`, {
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
                        title: "Estado editado exitosamente",
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
                console.error("Error al editar el estado", error);
                Swal.fire({
                    title: "Error al editar el estado",
                    icon: "error",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
            finally {
                setIsLoading(false);
            }
        }
    });

    // Manejar el cambio en el Select (Actualizar Formik)
    const handleEstadoChange = (value) => {
        formik.setFieldValue("idEstado", value);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="p-4 mt-4">
                            <h2 className="text-principal font-bold text-xl flex justify-center mb-8">Editar Estado</h2>
                            <div className="w-full mt-6 flex justify-center">
                                <div className="w-3/4">
                                    <Select
                                        name="idEstado"
                                        value={formik.values.idEstado}
                                        onChange={(e) => handleEstadoChange(e.target.value)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Seleccione estado"
                                        className="max-w-xs mt-4"
                                        radius="full"
                                        isInvalid={formik.touched.idEstado && formik.errors.idEstado}
                                        errorMessage={formik.errors.idEstado}
                                        defaultSelectedKeys={[`${pedidoSelect?.idEstado}`]}
                                    >
                                        {estados.map((estado) => (
                                            <SelectItem key={estado.idEstado} value={estado.idEstado}>
                                                {estado.nombre}
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
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-700 z-10">
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <div className="border-4 border-t-4 border-gray-300 border-t-danger rounded-full w-10 h-10 animate-spin"></div>
                                <span className="text-white">Espere un momento...</span>
                            </div>
                        </div>
                    )}
                </form>
            </ModalContent>
        </Modal>
    );
}

export default ModalEstado;
