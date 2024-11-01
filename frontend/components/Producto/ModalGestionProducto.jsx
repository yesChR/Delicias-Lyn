
/**
 * Albin Liang 30/10/2024
 * 
 * Componente para crear y editar productos
 */
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
    Autocomplete,
    AutocompleteItem,
    CheckboxGroup,
    Checkbox,
} from "@nextui-org/react";
import { useRef, useState } from "react";

export default function GestionProductosModal({ isOpen, onOpenChange, modo }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [codigo, setCodigo] = useState('');
    const [precio, setPrecio] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState(null);
    const [subcategoria, setSubcategoria] = useState(null);
    const [estado, setEstado] = useState(null);
    const [tipo, setTipo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const categorias = [
        { label: "Galletas", value: "opcion1" },
        { label: "Panes", value: "opcion2" },
        { label: "Queques", value: "opcion3" },
        { label: "Bocadillos", value: "opcion4" },

    ];

    const subcategorias = [
        { label: "Seco", value: "opcion1" },
        { label: "Tradicional", value: "opcion2" },
        { label: "Chocolate", value: "opcion3" },
        { label: "Tres leches", value: "opcion4" },

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

    const seleccionarImagen = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(file.name);
        }
    };


    const ventanaEditar = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Producto editado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, []);

    const ventanaCrear = useCallback(() => {
        Swal.fire({
            icon: "success",
            title: "Producto creado exitosamente",
            showConfirmButton: false,
            timer: 1000
        });
    }, []);



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
                <ModalHeader style={modalStyles.header}>
                    {getModalTitle()}
                </ModalHeader>
                <ModalBody style={modalStyles.body}>
                    <div style={modalStyles.inputContainer}>
                        {currentPage === 1 && (
                            <>
                                <InputGroup label="Código" value={codigo} setValue={setCodigo} />
                                <InputGroup label="Precio" type="number" value={precio} setValue={setPrecio} />
                                <InputGroup label="Nombre" value={nombre} setValue={setNombre} />
                                <FileInput fileInputRef={fileInputRef} seleccionarImagen={seleccionarImagen} />
                                <AutocompleteGroup label="Categoría" options={categorias} setValue={setCategoria} />
                                <AutocompleteGroup label="Subcategoría" options={subcategorias} setValue={setSubcategoria} />
                                <AutocompleteGroup label="Estado" options={estadoPedido} setValue={setEstado} />
                                <AutocompleteGroup label="Tipo" options={categorias} setValue={setTipo} />
                                <InputDescription label="Descripción" value={descripcion} setValue={setDescripcion} />
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
                        color="danger"
                        style={{ marginLeft: 'auto', marginTop: '20px' }}
                        onClick={() => {
                            if (modo) {
                                ventanaEditar();
                            } else {
                                ventanaCrear();
                            }
                            onOpenChange(false);
                        }}
                    >
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

// Componente de Input con etiqueta
const InputGroup = ({ label, value, setValue, type = "text" }) => (
    <div style={{ flex: '1 1 45%' }}>
        <Input

            className="max-w-xs"
            label={label}
            color="danger"
            type={type}
            variant="bordered"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
);


const InputDescription = ({ label, value, setValue, type = "text" }) => (
    <div style={{ flex: '1 1 100%' }}>
        <Input
            color='danger'

            classNames={{
                inputWrapper: [
                    "max-w-full",
                    "min-h-[35px]",
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                ],
            }}
            type={type}
            variant="bordered"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
        />
    </div>
);

const AutocompleteGroup = ({ label, options, setValue }) => (
    <div style={{ flex: '1 1 48%' }}>
        <Autocomplete
            isRequired
            defaultItems={options}
            label={label}
            variant="bordered"
            className="max-w-xs"
            placeholder="Seleccione"
            color="danger"
            onChange={(_, value) => setValue(value)}
        >
            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
    </div>
);



// Componente de entrada de archivo

const FileInput = ({ fileInputRef, seleccionarImagen }) => (
    <div style={{ flex: '1 1 45%' }}>
        <input
            type="file"
            ref={fileInputRef}
            onChange={seleccionarImagen}
            style={{ display: 'none' }}
            accept="image/*"
        />
        <Button
            style={{ height: '100%' }}
            onClick={() => fileInputRef.current.click()}
            className="max-w-xs w-full border-2 border-[rgb(220, 53, 69)] bg-white"
            color="default"
            variant="flat"
        >
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'rgb(220, 53, 69)', height: '40px', padding: '0', margin: '0' }}>
                Seleccionar imagen
            </span>
        </Button>
    </div>
);
