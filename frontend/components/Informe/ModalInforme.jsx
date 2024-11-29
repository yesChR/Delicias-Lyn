import { Modal, ModalContent, ModalBody, ModalFooter, Button, DatePicker } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const ModalInforme = ({ isOpen, onOpenChange }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const validationSchema = Yup.object({
        fechaInicio: Yup.date().required("Fecha de inicio es obligatoria").nullable(),
        fechaFin: Yup.date()
            .required("Fecha de fin es obligatoria")
            .nullable()
            .test(
                "is-after",
                "La fecha de fin debe ser posterior a la fecha de inicio",
                function (value) {
                    const { fechaInicio } = this.parent;
                    return !fechaInicio || !value || new Date(fechaInicio) <= new Date(value);
                }
            ),
    });

    const formik = useFormik({
        initialValues: {
            fechaInicio: null,
            fechaFin: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!formik.isValid) return;

            const fechaInicioFormatted = values.fechaInicio
                ? new Date(values.fechaInicio).toLocaleDateString('en-CA') 
                : null;

            const fechaFinFormatted = values.fechaFin
                ? new Date(values.fechaFin).toLocaleDateString('en-CA') 
                : null;

            try {
                const response = await fetch(`${apiUrl}/informe/generar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fechaInicio: fechaInicioFormatted,
                        fechaFin: fechaFinFormatted,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos');
                }

                const datos = await response.json();
                const pedidos = datos.pedidos;

                console.log(pedidos);

                if (pedidos.length > 0) {
                    const gananciaTotal = pedidos.reduce((acc, pedido) => acc + pedido.montoTotal, 0);
                    console.log('Ganancia Total:', gananciaTotal);
                    generarPDF(pedidos, gananciaTotal, fechaInicioFormatted, fechaFinFormatted);

                } else {
                    Swal.fire({
                        title: "No hay pedidos en el periodo seleccionado. No se generará el informe.",
                        icon: "warning",
                        confirmButtonColor: "#fdc6c6",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
            }
        },
    });
    const generarPDF = (pedidos, gananciaTotal, fechaInicio, fechaFin) => {
        const doc = new jsPDF();
    
        doc.addFileToVFS("ArialUnicodeMS.ttf", "path_to_font.ttf");
        doc.setFont("ArialUnicodeMS");
    
        const colorFondo = [255, 182, 193];
        const colorTexto = [0, 0, 0];
    
        doc.setFillColor(...colorFondo);
        doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
    
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255); 
        doc.text("Delicias Lyn", 14, 10);
    
        doc.setFontSize(14);
        doc.setTextColor(...colorTexto);
        doc.text("Informe de Pedidos", 14, 20);
    

        const fechaTexto = `Periodo: ${fechaInicio} - ${fechaFin}`;
        doc.setFontSize(12);
        doc.setTextColor(...colorTexto); 
        doc.text(fechaTexto, doc.internal.pageSize.width - 14 - doc.getTextWidth(fechaTexto), 20);
    
        const columns = ["ID Pedido", "Fecha", "Monto"];
        const data = pedidos.map(pedido => [
            pedido.idPedido,
            pedido.fechaEntrega,
            `${pedido.montoTotal.toFixed(2)}`,
        ]);
    
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 40, 
            theme: 'grid',
            headStyles: {
                fillColor: [255, 182, 193],
                textColor: [0, 0, 0],
                fontSize: 12,
                font: "helvetica",
                halign: 'center'
            },
            bodyStyles: {
                fontSize: 12,
                font: "helvetica",
                halign: 'center'
            }
        });
    
        const gananciaData = [['Total: ',`${gananciaTotal.toFixed(2)}`]];
        doc.autoTable({
            head: [],
            body: gananciaData,
            startY: doc.lastAutoTable.finalY + 10,
            theme: 'grid',
            bodyStyles: {
                fontSize: 12,
                font: "helvetica",
                halign: 'right'
            },
            columnStyles: {
                1: { halign: 'left' }
            }
        });
    
        doc.save('informe_pedidos.pdf');
    };
    
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="py-4 w-full mx-auto space-y-4">
                            <div className="space-y-4">
                                <div className="flex flex-col w-full">
                                    <DatePicker
                                        aria-label="Fecha de inicio"
                                        label={"Fecha de inicio"}
                                        labelPlacement="outside"
                                        value={formik.values.fechaInicio}
                                        onChange={(date) => formik.setFieldValue("fechaInicio", date)}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.fechaInicio && formik.errors.fechaInicio}
                                        errorMessage={formik.errors.fechaInicio}
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <DatePicker
                                        aria-label="Fecha de fin"
                                        label={"Fecha de fin"}
                                        labelPlacement="outside"
                                        value={formik.values.fechaFin}
                                        onChange={(date) => formik.setFieldValue("fechaFin", date)}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.fechaFin && formik.errors.fechaFin}
                                        errorMessage={formik.errors.fechaFin}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-center gap-4">
                        <Button color="danger" variant="light" onPress={onOpenChange}>
                            Cerrar
                        </Button>
                        <Button type="submit" color="danger" isDisabled={formik.isSubmitting}>
                            Generar Informe
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ModalInforme;
