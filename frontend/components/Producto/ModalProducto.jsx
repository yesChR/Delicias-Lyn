import { Modal, Input, ModalContent, ModalBody, ModalFooter, Button, Select } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const ModalProducto = ({ isOpen, onOpenChange, productoSeleccionado, recargar }) => {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/visualizar`);
            const data = await response.json();
            setCategorias(data);
        };
        const fetchSubcategorias = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategoria/visualizar`);
            const data = await response.json();
            setSubcategorias(data);
        };

        fetchCategorias();
        fetchSubcategorias();
    }, []);

    const formik = useFormik({
        initialValues: {
            nombre: productoSeleccionado?.nombre || "",
            categoria: productoSeleccionado?.categoria?.idCategoria || "",
            subcategoria: productoSeleccionado?.subcategoria?.idSubcategoria || "",
            tamaño: productoSeleccionado?.tamaño || "",
            precio: productoSeleccionado?.precio || "",
            descripcion: productoSeleccionado?.descripcion || "",
            tipo: productoSeleccionado?.tipo || "",
            estado: productoSeleccionado?.estado || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nombre: Yup.string().required("El nombre es obligatorio"),
            categoria: Yup.string().required("La categoría es obligatoria"),
            subcategoria: Yup.string().required("La subcategoría es obligatoria"),
            precio: Yup.number().required("El precio es obligatorio").positive(),
            estado: Yup.string().required("El estado es obligatorio"),
        }),
        onSubmit: async (values) => {
            const method = productoSeleccionado ? "PUT" : "POST";
            const endpoint = productoSeleccionado
                ? `${process.env.NEXT_PUBLIC_API_URL}/producto/editar/${productoSeleccionado.idProducto}`
                : `${process.env.NEXT_PUBLIC_API_URL}/producto/crear`;

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                recargar();
                onOpenChange(false);
            } else {
                alert("Error al guardar el producto");
            }
        },
    });

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <h2 className="text-principal font-bold text-xl text-center">Editar Producto</h2>
                        <Input
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            placeholder="Nombre"
                            className="mb-4"
                        />
                        <Select
                            label="Categoría"
                            value={formik.values.categoria}
                            onChange={(e) => formik.setFieldValue("categoria", e)}
                        >
                            {categorias.map((cat) => (
                                <Select.Option key={cat.idCategoria} value={cat.idCategoria}>
                                    {cat.nombre}
                                </Select.Option>
                            ))}
                        </Select>
                        <Select
                            label="Subcategoría"
                            value={formik.values.subcategoria}
                            onChange={(e) => formik.setFieldValue("subcategoria", e)}
                        >
                            {subcategorias.map((subcat) => (
                                <Select.Option key={subcat.idSubcategoria} value={subcat.idSubcategoria}>
                                    {subcat.nombre}
                                </Select.Option>
                            ))}
                        </Select>
                        <Input
                            name="tamaño"
                            value={formik.values.tamaño}
                            onChange={formik.handleChange}
                            placeholder="Tamaño"
                            className="mb-4"
                        />
                        <Input
                            name="precio"
                            value={formik.values.precio}
                            onChange={formik.handleChange}
                            placeholder="Precio"
                            type="number"
                            className="mb-4"
                        />
                        <Input
                            name="descripcion"
                            value={formik.values.descripcion}
                            onChange={formik.handleChange}
                            placeholder="Descripción"
                            className="mb-4"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => onOpenChange(false)}>Cancelar</Button>
                        <Button type="submit">Guardar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ModalProducto;
