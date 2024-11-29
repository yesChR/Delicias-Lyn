import { useCallback, useState, useRef, useEffect } from "react";
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
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    codigo: Yup.string()
        .matches(/^[0-9]+$/, "El código debe contener solo números")
        .max(11, "No puede ser mayor a 12 dígitos")
        .required("El código es obligatorio"),
    precio: Yup.number()
        .typeError("El precio debe ser un número")
        .positive("El precio debe ser un número positivo")
        .max(100000000, "El precio no debe ser mayor a 100000000")
        .required("El precio es obligatorio"),
    nombre: Yup.string()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "El nombre solo puede contener letras y espacios")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no debe tener más de 50 caracteres")
        .required("El nombre es obligatorio"),
    categoria: Yup.string().required("La categoría es obligatoria"),
    subcategoria: Yup.string().required("La subcategoría es obligatoria"),
    estado: Yup.string().required("El estado es obligatorio"),
    tipo: Yup.string().required("El tipo es obligatorio"),
    descripcion: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),
    imagen: Yup.mixed().required("Debe subir una imagen"),
});

export default function GestionProductosModal({ isOpen, onOpenChange, modo, producto }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [estados, setEstados] = useState([]);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/visualizar`);
            const data = await response.json();
            setCategorias(data.map((cat) => ({ label: String(cat.nombre), value: String(cat.idCategoria) })));
        };

        const fetchSubcategorias = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategoria/visualizar`);
            const data = await response.json();
            setSubcategorias(data.map((sub) => ({ label: String(sub.nombre), value: String(sub.idSubcategoria) })));
        };

        const fetchEstados = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/estado/visualizar`);
                const data = await response.json();
                setEstados(data.map((estado) => ({ label: String(estado.nombre), value: String(estado.idEstado) })));
            } catch (error) {
                console.error("Error al obtener estados:", error);
            }
        };

        fetchEstados();
        fetchCategorias();
        fetchSubcategorias();
    }, []);

    const { handleChange, handleSubmit, handleBlur, isValid, resetForm, setFieldValue, values, errors, touched } =
        useFormik({
            initialValues: {
                codigo: producto?.codigo || "",
                precio: producto?.precio || "",
                nombre: producto?.nombre || "",
                categoria: producto?.categoria || "",
                subcategoria: producto?.subcategoria || "",
                estado: producto?.estado || "",
                tipo: producto?.tipo || "",
                descripcion: producto?.descripcion || "",
                imagen: null,
            },
            enableReinitialize: true,
            validationSchema,
            onSubmit: async (formValues) => {
                const method = modo ? "PUT" : "POST";
                const url = modo
                    ? `${process.env.NEXT_PUBLIC_API_URL}/producto/editar/${producto.idProducto}`
                    : `${process.env.NEXT_PUBLIC_API_URL}/producto/crear`;

                const formData = new FormData();
                Object.entries(formValues).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const response = await fetch(url, {
                    method,
                    body: formData,
                });

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: modo ? "¡Producto editado exitosamente!" : "¡Producto creado exitosamente!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    resetForm();
                    onOpenChange(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al guardar el producto",
                        text: await response.text(),
                    });
                }
            },
        });

    const modalStyles = {
        header: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
            marginTop: "25px",
            marginBottom: "5px",
            color: "rgb(255, 105, 132)",
        },
        body: {
            marginLeft: "3%",
            marginRight: "3%",
        },
        inputContainer: {
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
        },
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            <ModalContent style={{ width: "700px", maxWidth: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader style={modalStyles.header}>
                        {modo ? "Editar Producto" : "Crear Producto"}
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
                                        error={touched.precio && errors.precio}
                                    />
                                    <InputGroup
                                        label="Nombre"
                                        name="nombre"
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.nombre && errors.nombre}
                                    />
                                    <FileInput fileInputRef={fileInputRef} setFieldValue={setFieldValue} />
                                    <DropdownGroup
                                        name="categoria"
                                        label="Selecciona una categoría"
                                        options={categorias}
                                        value={values.categoria || ""} // Valor actual de Formik
                                        onChange={(value) => {
                                            console.log("Categoría seleccionada:", value); // Registro para debugging
                                            setFieldValue("categoria", value); // Actualiza el valor en Formik
                                        }}
                                        onBlur={() => handleBlur({ target: { name: "categoria" } })} // Marca como "tocado"
                                        errorMessage={touched.categoria && errors.categoria}
                                    />

                                    <DropdownGroup
                                        name="subcategoria"
                                        label="Selecciona una subcategoría"
                                        options={subcategorias}
                                        value={values.subcategoria || ""} // Valor actual de Formik
                                        onChange={(value) => {
                                            console.log("Subcategoría seleccionada:", value); // Registro para debugging
                                            setFieldValue("subcategoria", value); // Actualiza el valor en Formik
                                        }}
                                        onBlur={() => handleBlur({ target: { name: "subcategoria" } })} // Marca como "tocado"
                                        errorMessage={touched.subcategoria && errors.subcategoria}
                                    />

                                    <DropdownGroup
                                        name="estado"
                                        label="Seleccione un estado"
                                        options={estados} // Estados cargados dinámicamente
                                        value={values.estado || ""} // Valor actual de Formik
                                        onChange={(value) => {
                                            console.log("Estado seleccionado:", value); // Registro para debugging
                                            setFieldValue("estado", value); // Actualiza el valor en Formik
                                        }}
                                        onBlur={() => handleBlur({ target: { name: "estado" } })} // Marca como "tocado"
                                        errorMessage={touched.estado && errors.estado}
                                    />

                                    <DropdownGroup
                                        name="tipo"
                                        label="Seleccione el tipo"
                                        options={[
                                            { label: "Tipo 1", value: "Tipo 1" },
                                            { label: "Tipo 2", value: "Tipo 2" },
                                        ]}
                                        value={values.tipo || ""} // Valor actual de Formik
                                        onChange={(value) => {
                                            console.log("Tipo seleccionado:", value); // Registro para debugging
                                            setFieldValue("tipo", value); // Actualiza el valor en Formik
                                        }}
                                        onBlur={() => handleBlur({ target: { name: "tipo" } })} // Marca como "tocado"
                                        errorMessage={touched.tipo && errors.tipo}
                                    />

                                    <InputDescription
                                        name="descripcion"
                                        label="Descripción"
                                        value={values.descripcion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.descripcion && errors.descripcion}
                                    />
                                </>
                            )}
                            {currentPage === 2 && (
                                <div style={{ display: currentPage === 2 ? "block" : "none" }}>
                                    <CheckboxGroup
                                        size="lg"
                                        label="Seleccionar tamaños"
                                        classNames={{
                                            wrapper: "gap-4", // Aumenta el espacio entre los Checkboxes
                                            label: "text-xl mb-3", // Aumenta el tamaño del texto de la etiqueta
                                            icon: "text-2xl", // Aumenta el tamaño del icono dentro del Checkbox
                                        }}
                                        value={selectedSizes}
                                        onChange={(value) => {
                                            console.log("Tamaños seleccionados:", value); // Debugging para verificar el valor seleccionado
                                            setSelectedSizes(value); // Actualiza el estado local de tamaños
                                            setFieldValue("tamanos", value); // Actualiza el valor en Formik
                                        }}
                                        onBlur={() => handleBlur({ target: { name: "tamanos" } })} // Marca el campo como "tocado"
                                    >
                                        <Checkbox color="danger" value="Pequeño">
                                            Pequeño
                                        </Checkbox>
                                        <Checkbox color="danger" value="Mediano">
                                            Mediano
                                        </Checkbox>
                                        <Checkbox color="danger" value="12 porciones">
                                            12 porciones
                                        </Checkbox>
                                        <Checkbox color="danger" value="Dos pisos">
                                            Dos pisos
                                        </Checkbox>
                                        <Checkbox color="danger" value="30 porciones">
                                            30 porciones
                                        </Checkbox>
                                    </CheckboxGroup>
                                    {touched.tamanos && errors.tamanos && (
                                        <div style={{ color: "rgb(243, 18, 96)", fontSize: "12px", marginTop: "3px" }}>
                                            {errors.tamanos}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter style={modalStyles.footer}>
                        <Pagination
                            total={2}
                            color="danger"
                            page={currentPage}
                            onChange={setCurrentPage}
                            showControls
                        />
                        <Button type="submit" color="danger">
                            OK
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

const InputGroup = ({ label, name, value, onChange, onBlur, error }) => (
    <div style={{ flex: "1 1 45%" }}>
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
            isInvalid={!!error}
            errorMessage={error}
        />
    </div>
);

const InputDescription = ({ label, name, value, onChange, onBlur, errorMessage }) => (
    <div style={{ flex: "1 1 100%" }}>
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
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
        />
    </div>
);

const DropdownGroup = ({ name, label, options, value, onChange, onBlur, errorMessage }) => (
    <div style={{ flex: "1 1 48%", marginBottom: "15px" }}>
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="border-2 border-[rgb(220, 53, 69)] bg-white"
                    style={{ height: "55px", width: "100%", color: "rgb(243, 18, 96)" }}
                >
                    {options.find((opt) => opt.value === value)?.label || label} {/* Muestra la opción seleccionada */}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label={label}
                onAction={(key) => {
                    onChange(key); // Llama a onChange pasado como prop
                    if (onBlur) onBlur(); // Llama a onBlur si se pasa como prop
                }}
                selectedKeys={value ? [value] : []} // Selecciona la clave actual
            >
                {options.map((option) => (
                    <DropdownItem key={option.value}>{option.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <div style={{ color: "rgb(243, 18, 96)", fontSize: "12px", marginTop: "3px" }}>
            {errorMessage}
        </div>
    </div>
);

const FileInput = ({ fileInputRef, setFieldValue }) => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFieldValue("imagen", file);
        }
    };

    return (
        <div style={{ flex: "1 1 45%" }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
            />
            <Button
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-[rgb(220, 53, 69)] bg-white text-[rgb(243, 18, 96)]"
                style={{
                    height: "100%",
                    width: "100%",
                    color: "rgb(243, 18, 96)", // Asegura el color del texto
                    fontSize: "14px", // Opcional: ajusta el tamaño del texto para que coincida con otros botones
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {fileName || "Seleccionar imagen"}
            </Button>
        </div>
    );
};
