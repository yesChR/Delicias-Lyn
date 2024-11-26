import { useCallback } from "react";
import Swal from "sweetalert2";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Pagination,
    CheckboxGroup,
    Checkbox,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    codigo: Yup.string()
        .matches(/^[0-9]+$/, 'El código debe contener solo números') // Valida números
        .max(11, 'No puede ser mayor a 12 dígitos') // Limita a 11 dígitos
        .required('El código es obligatorio')
    ,
    precio: Yup.number()
        .typeError('El precio debe ser un número')  // Maneja si se ingresan caracteres no numéricos
        .positive('El precio debe ser un número positivo')  // Solo permite valores positivos
        .max(100000000, 'El precio no debe ser mayor a 100000000')  // Límite máximo opcional
        .required('El precio es obligatorio')
    ,
    nombre: Yup.string()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El nombre solo puede contener letras y espacios') // Solo letras y espacios
        .min(2, 'El nombre debe tener al menos 2 caracteres') // Longitud mínima
        .max(50, 'El nombre no debe tener más de 50 caracteres')
        .required('El nombre es obligatorio')
    ,
    categoria: Yup.string()
        .required('La categoría es obligatoria')
    ,
    subcategoria: Yup.string()
        .required('La subcategoría es obligatoria')
    ,
    estado: Yup.string()
        .required('El estado es obligatorio'),
    tipo: Yup.string()
        .required('El tipo es obligatorio'),
});





export default function GestionProductosModal({ isOpen, onOpenChange, modo, producto }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSizes, setSelectedSizes] = useState([]); // Estado para mantener las selecciones de los checkboxes
    const handleNextPage = () => {
        if (isValid) {
            setCurrentPage(2); // Incrementa la página
        }
    };

    const ventanaSugerencia = useCallback((title) => {
        Swal.fire({
            icon: 'warning',
            title: title,
            showConfirmButton: false,
            timer: 1000
        });
    }, []);

    const ventanaExito = useCallback(() => {
        Swal.fire({
            icon: 'success',                       // Icono de éxito
            title: '¡Producto creado exitósamente!', // Mensaje de éxito
            showConfirmButton: false,
            timer: 1500                           // Duración de 1.5 segundos
        });
    }, []);

    const onSubmit = () => {
        const isEmpty = selectedSizes.length === 0;
        if (isEmpty) {
            ventanaSugerencia('Seleccione los tamaños del producto');
        } else {
            ventanaExito();
            resetForm();
            onOpenChange(false);
            setSelectedSizes([]);  // Resetea el estado a un array vacío
            setCurrentPage(1)
            console.log(values);
            console.log(selectedSizes);
        }
    }
    // Inicializando Formik
    const { handleChange, handleSubmit, handleBlur, isValid, resetForm, setValues, setFieldValue,
        values, errors, touched } = useFormik({
            initialValues: {
                codigo: '', // Inicializa el valor del campo
                precio: 0,
                nombre: '',
                categoria: '',
                subcategoria: '',
                estado: '',
                tipo: '',
                descripcion: '',
                imagen: ''
            },
            onSubmit,
            validationSchema,
        });


    useEffect(() => {
        if (producto) {
            // Utilizando setFieldValue para setear los valores individualmente
            setFieldValue("codigo", producto.idProducto || "");
            setFieldValue("nombre", producto.nombre || "");
            setFieldValue("precio", producto.precio || "");
            setFieldValue("categoria", producto.categoria || "");
            setFieldValue("estado", producto.estado || "");
            setFieldValue("subcategoria", producto.subcategoria || "");
            setFieldValue("tipo", producto.tipo || "");
            setFieldValue("descripcion", producto.descripcion || "");
            setSelectedSizes([producto.tamaño]);




        }
    }, [producto]);


    const categorias = [
        { label: "Galletas", value: "Galletas" },
        { label: "Panes", value: "Panes" },
        { label: "Queques", value: "Queques" },
        { label: "Bocadillos", value: "Bocadillos" },

    ];

    const subcategorias = [
        { label: "Seco", value: "Seco" },
        { label: "Tradicional", value: "Tradicional" },
        { label: "Chocolate", value: "Chocolate" },
        { label: "Tres leches", value: "Tres leches" },

    ];

    const estadoPedido = [
        { label: "Pendiente de revisión", value: "Pendiente de revisión" },
        { label: "Aceptado", value: "Aceptado" },
        { label: "Rechazado", value: "Rechazado" },
        { label: "Pendiente de pago", value: "Pendiente de pago" },
        { label: "Anticipo", value: "Anticipo" },
        { label: "Pagado", value: "Pagado" },
    ];

    const fileInputRef = useRef(null);


    const getModalTitle = () => {
        if (modo) {
            return currentPage === 1 ? "Editar Producto" : "Editar Tamaños del Producto";
        } else {
            return currentPage === 1 ? "Crear Producto" : "Tamaños del Producto";
        }
    };

    const modalStyles = {
        header: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '25px',
            marginTop: '25px',
            marginBottom: '5px',
            color: 'rgb(255, 105, 132)',
        },
        body: {
            marginLeft: '3%',
            marginRight: '3%',
        },
        inputContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
        },
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent style={{ width: '700px', maxWidth: '100%' }}>
                <form onSubmit={handleSubmit}>

                    <ModalHeader style={modalStyles.header}>
                        {getModalTitle()}
                    </ModalHeader>
                    <ModalBody style={modalStyles.body}>
                        <div style={modalStyles.inputContainer}>
                            {currentPage === 1 && (
                                <>
                                    <InputGroup
                                        label="Código"
                                        name="codigo"
                                        value={values.codigo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.codigo && errors.codigo}
                                    />
                                    <InputGroup
                                        label="Precio"
                                        name="precio"
                                        value={values.precio}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.precio && errors.precio} // Solo mostrar error si el campo fue tocado
                                    />

                                    <InputGroup
                                        label="Nombre"
                                        name="nombre"
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.nombre && errors.nombre} // Solo mostrar error si el campo fue tocado
                                    />
                                    <FileInput fileInputRef={fileInputRef} name='imagen' value={values.imagen} />
                                    <DropdownGroup
                                        name="categoria"
                                        label="Selecciona una categoría"
                                        options={categorias}
                                        value={values.categoria}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.categoria && errors.categoria}
                                    />

                                    <DropdownGroup
                                        name="subcategoria"
                                        label="Selecciona una subcategoría"
                                        options={subcategorias}
                                        value={values.subcategoria}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.subcategoria && errors.subcategoria}
                                    />
                                    <DropdownGroup
                                        name="estado"
                                        label="Seleccione un estado"
                                        options={estadoPedido}
                                        value={values.estado}  // Valor de Formik
                                        onChange={handleChange}  // Actualiza el valor de Formik
                                        onBlur={handleBlur}  // Llama al evento onBlur de Formik
                                        errorMessage={touched.estado && errors.estado}  // Muestra el error si el campo fue tocado
                                    />
                                    <DropdownGroup
                                        name="tipo"
                                        label="Seleccione el tipo"
                                        options={categorias}
                                        value={values.tipo}  // Valor de Formik
                                        onChange={handleChange}  // Actualiza el valor de Formik
                                        onBlur={handleBlur}  // Llama al evento onBlur de Formik
                                        errorMessage={touched.tipo && errors.tipo}  // Muestra el error si el campo fue tocado
                                    />

                                    <InputDescription
                                        name="descripcion"
                                        label="Descripción"
                                        value={values.descripcion}
                                        onChange={handleChange}  // Actualiza el valor de Formik
                                        onBlur={handleBlur}  // Llama al evento onBlur de Formik
                                        errorMessage={touched.descripcion && errors.descripcion}
                                    />
                                </>
                            )}
                            {currentPage === 2 && (
                                <CheckboxGroup
                                    size="lg"
                                    label="Seleccionar tamaños"
                                    classNames={{
                                        wrapper: "gap-4", // Aumenta el espacio entre los Checkboxes
                                        label: "text-xl mb-3", // Aumenta el tamaño del texto de la etiqueta
                                        icon: "text-2xl", // Aumenta el tamaño del icono dentro del Checkbox
                                    }}
                                    value={selectedSizes} // Aquí se utiliza el estado
                                    onChange={setSelectedSizes} // Act

                                >
                                    <Checkbox color="danger" value="Pequeño">Pequeño</Checkbox>
                                    <Checkbox color="danger" value="Mediano">Mediano</Checkbox>
                                    <Checkbox color="danger" value="12 porciones">12 porciones</Checkbox>
                                    <Checkbox color="danger" value="Dos pisos">Dos pisos</Checkbox>
                                    <Checkbox color="danger" value="30 porciones">30 porciones</Checkbox>
                                </CheckboxGroup>

                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter style={modalStyles.footer}>
                        <div className="flex w-full justify-center mt-6">
                            <Pagination
                                total={2}
                                color="danger"
                                page={currentPage}
                                onChange={setCurrentPage}
                                showControls
                                style={{ padding: '0' }}
                            />
                        </div>
                        <Button
                            type="submit"
                            color="danger"
                            style={{ marginLeft: 'auto', marginTop: '20px' }}
                            onClick={handleNextPage} // Cambia la página hacia adelante

                        >
                            OK

                        </Button>
                    </ModalFooter>


                </form>

            </ModalContent>

        </Modal>
    );
}

// Componente InputGroup para el campo "codigo"
const InputGroup = ({ label, name, value, onChange, onBlur, error ,modo}) => (

    <div style={{ flex: '1 1 45%' }}>
        <Input
            name={name}
            type="text"
            fullWidth
            label={label}
            variant="bordered"
            color="danger"
            className="text-black"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={error && error}
            errorMessage={error}
        />
    </div>
);





const InputDescription = ({ label, name, value, onChange, onBlur, error }) => (
    <div style={{ flex: '1 1 100%' }}>
        <Input
            name={name}
            type="text"
            fullWidth
            label={label}
            variant="bordered"
            color="danger"
            className="text-black"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={error && error}
            errorMessage={error}
        />
    </div>
);



const DropdownGroup = ({ name, label, options, value, onChange, onBlur, errorMessage }) => (
    <div style={{ flex: '1 1 48%', width: '100%', minWidth: '20px', maxHeight: '55px', margin: '0', marginBottom: '15px' }}>
        <Dropdown>
            <DropdownTrigger>
                <Button
                    style={{ height: "55px", width: '100%', margin: '0', color: 'rgb(243, 18, 96)', margin: '0', padding: '12px' }}
                    className=" border-2 border-[rgb(220, 53, 69)] bg-white"
                    color="danger"
                    variant="flat"


                >
                    {value ? options.find(opt => opt.value === value)?.label : label}
                    <span style={{ width: '100%', height: "50px", color: 'rgb(243, 18, 96)', height: '40px', padding: '0', margin: '0' }}>
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu

                aria-label={label}
                onAction={(key) => {
                    onChange({ target: { name, value: key } });
                }}
                selectedKeys={value ? [value] : []}
            >
                {options.map((option) => (
                    <DropdownItem key={option.value}>
                        {option.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <div style={{ color: 'rgb(243, 18, 96)', fontSize: '12px', marginLeft: '5px', marginTop: '3px' }}>
            {errorMessage}
        </div>

    </div>
);



const FileInput = ({ fileInputRef }) => {
    const [fileName, setFileName] = useState(""); // State to store the selected file name

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name when an image is selected
        }
    };

    return (
        <div style={{ flex: "1 1 45%", minWidth: "20px", maxHeight: "55px" }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
            />
            <Button
                style={{ height: "100%" }}
                onClick={() => fileInputRef.current.click()}
                className="max-w-xs w-full border-2 border-[rgb(220, 53, 69)] bg-white"
                color="default"
                variant="flat"
            >
                <span
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "rgb(243, 18, 96)",
                        height: "40px",
                        padding: "0",
                        margin: "0",
                        textOverflow: "ellipsis",  // Truncate text with an ellipsis if it overflows
                        whiteSpace: "nowrap",      // Prevent the text from wrapping to the next line
                        overflow: "hidden",       // Hide any overflowing text
                        maxWidth: "100%",
                    }}
                >
                    {fileName ? fileName : "Seleccionar imagen"} {/* Show the file name if selected */}
                </span>
            </Button>
        </div>
    );
};