import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ModalInforme = ({ isOpen, onOpenChange, generarInforme }) => {
    const schemaInforme = Yup.object({
        rango: Yup.string()
            .required("El rango es requerido")
            .oneOf(["diario", "mensual", "anual"], "Rango inválido"),
        mes: Yup.string().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            rango: "",
            mes: "",
        },
        validationSchema: schemaInforme,
        onSubmit: async (values) => {
            // Limpia el campo "mes" si el rango no es "mensual"
            if (values.rango !== "mensual") {
                values.mes = null;
            }

            try {
                await generarInforme(values);
                Swal.fire({
                    icon: "success",
                    title: "Informe generado exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                });
                onOpenChange(false); // Cierra el modal después de generar el informe
            } catch (error) {
                console.error("Error al generar el informe:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error al generar el informe",
                    text: "Por favor, inténtelo nuevamente.",
                    confirmButtonColor: "#fdc6c6",
                });
            }
        },
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="p-4">
                            <h2 className="text-principal font-bold text-xl flex justify-center mb-4">
                                Generar Informe
                            </h2>
                            <p className="text-gray-600 text-center mb-4">
                                Elija un rango. Si selecciona "Mensual", debe indicar el mes correspondiente.
                            </p>
                            <div className="w-full flex flex-col items-center gap-4">
                                {/* Combo box para rango */}
                                <div className="w-full">
                                    <Select
                                        name="rango"
                                        value={formik.values.rango}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            formik.setFieldValue("rango", value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Seleccione rango"
                                        className="max-w-xs text-black"
                                        radius="full"
                                        isInvalid={formik.touched.rango && !!formik.errors.rango}
                                        errorMessage={formik.errors.rango}
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
                                </div>

                                {/* Combo box para mes */}
                                <div className="w-full">
                                    <Select
                                        name="mes"
                                        value={formik.values.mes}
                                        onChange={(e) => formik.setFieldValue("mes", e.target.value)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Seleccione mes (solo para informes mensuales)"
                                        className="max-w-xs text-black"
                                        radius="full"
                                        isInvalid={formik.touched.mes && !!formik.errors.mes}
                                        errorMessage={formik.errors.mes}
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
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => onOpenChange(false)}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            color="danger"
                            isDisabled={!formik.isValid || formik.isSubmitting}
                        >
                            Generar Informe
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ModalInforme;
