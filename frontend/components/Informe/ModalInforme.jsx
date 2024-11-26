import { Modal, Select, SelectItem, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const ModalInforme = ({ isOpen, onOpenChange, generarInforme }) => {
    const formik = useFormik({
        initialValues: {
            rango: "",
            mes: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.rango) {
                errors.rango = "El rango es requerido";
            }
            if (values.rango === "mensual" && !values.mes) {
                errors.mes = "Debe seleccionar un mes";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                // Limpia el campo "mes" si el rango no es "mensual"
                if (values.rango !== "mensual") {
                    values.mes = null;
                }

                await generarInforme(values);

                Swal.fire({
                    icon: "success",
                    title: "Informe generado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });

                onOpenChange(false); // Cierra el modal
            } catch (error) {
                console.error("Error al generar informe", error);

                Swal.fire({
                    icon: "error",
                    title: "Error al generar el informe",
                    confirmButtonColor: "#fdc6c6",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={formik.handleSubmit}>
                        <ModalBody>
                            <div className="p-4">
                                <h2 className="text-principal font-bold text-xl flex justify-center mb-4">
                                    Generar Informe
                                </h2>
                                <p className="text-gray-600 text-center mb-4">
                                    Seleccione un rango. El campo de mes es aplicable solo si el rango es "Mensual".
                                </p>
                                <div className="w-full flex flex-col items-center gap-4">
                                    {/* ComboBox para rango */}
                                    <div className="w-full">
                                        <Select
                                            name="rango"
                                            value={formik.values.rango}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                formik.setFieldValue("rango", value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            placeholder="Seleccione un rango"
                                            className="max-w-xs text-black"
                                            radius="full"
                                        >
                                            <SelectItem value="diario" className="text-black">
                                                Diario
                                            </SelectItem>
                                            <SelectItem value="mensual" className="text-black">
                                                Mensual
                                            </SelectItem>
                                            <SelectItem value="anual" className="text-black">
                                                Anual
                                            </SelectItem>
                                        </Select>
                                        {formik.errors.rango && formik.touched.rango && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.rango}</p>
                                        )}
                                    </div>

                                    {/* ComboBox para mes */}
                                    <div className="w-full">
                                        <Select
                                            name="mes"
                                            value={formik.values.mes}
                                            onChange={(e) => formik.setFieldValue("mes", e.target.value)}
                                            onBlur={formik.handleBlur}
                                            placeholder="Seleccione un mes"
                                            className="max-w-xs text-black"
                                            radius="full"
                                        >
                                            <SelectItem value="1" className="text-black">
                                                Enero
                                            </SelectItem>
                                            <SelectItem value="2" className="text-black">
                                                Febrero
                                            </SelectItem>
                                            <SelectItem value="3" className="text-black">
                                                Marzo
                                            </SelectItem>
                                            <SelectItem value="4" className="text-black">
                                                Abril
                                            </SelectItem>
                                            <SelectItem value="5" className="text-black">
                                                Mayo
                                            </SelectItem>
                                            <SelectItem value="6" className="text-black">
                                                Junio
                                            </SelectItem>
                                            <SelectItem value="7" className="text-black">
                                                Julio
                                            </SelectItem>
                                            <SelectItem value="8" className="text-black">
                                                Agosto
                                            </SelectItem>
                                            <SelectItem value="9" className="text-black">
                                                Septiembre
                                            </SelectItem>
                                            <SelectItem value="10" className="text-black">
                                                Octubre
                                            </SelectItem>
                                            <SelectItem value="11" className="text-black">
                                                Noviembre
                                            </SelectItem>
                                            <SelectItem value="12" className="text-black">
                                                Diciembre
                                            </SelectItem>
                                        </Select>
                                        {formik.errors.mes && formik.touched.mes && formik.values.rango === "mensual" && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.mes}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" color="danger" isDisabled={formik.isSubmitting}>
                                Generar Informe
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalInforme;
