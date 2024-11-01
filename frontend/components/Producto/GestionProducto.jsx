
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

    const opciones = [
        { label: "Opción 1", value: "opcion1" },
        { label: "Opción 2", value: "opcion2" },
        { label: "Opción 3", value: "opcion3" },
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
                                <InputGroup label="Código:" value={codigo} setValue={setCodigo} />
                                <InputGroup label="Precio:" type="number" value={precio} setValue={setPrecio} />
                                <InputGroup label="Nombre:" value={nombre} setValue={setNombre} />
                                <FileInput fileInputRef={fileInputRef} seleccionarImagen={seleccionarImagen} />
                                <AutocompleteGroup className="border" label="Categoría:" options={opciones} setValue={setCategoria} />
                                <AutocompleteGroup label="Subcategoría:" options={opciones} setValue={setSubcategoria} />
                                <AutocompleteGroup label="Estado:" options={estadoPedido} setValue={setEstado} />
                                <AutocompleteGroup label="Tipo:" options={opciones} setValue={setTipo} />
                                <InputDescription label="Descripción:" value={descripcion} setValue={setDescripcion} />
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
        <label style={{ paddingLeft: '10px', marginBottom: '5px', fontSize: '14px' }}>{label}</label>
        <Input
            classNames={{
                inputWrapper: [
                    "rounded-[25px]",
                    "min-h-[35px]",
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                    "group-data-[focus=true]:border-[rgb(255_95_100)]",
                    "bg-[rgb(244,244,245)]",
                ],
            }}
            type={type}
            variant="bordered"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
);


const InputDescription = ({ label, value, setValue, type = "text" }) => (
    <div style={{ flex: '1 1 100%' }}>
        <label style={{ paddingLeft: '10px', marginBottom: '5px', fontSize: '14px' }}>{label}</label>
        <Input
            classNames={{
                inputWrapper: [
                    "rounded-[25px]",
                    "min-h-[35px]",
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                    "group-data-[focus=true]:border-[rgb(255_95_100)]",
                    "bg-[rgb(244,244,245)]",
                ],
            }}
            type={type}
            variant="bordered"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
);

// Componente de Autocomplete
const AutocompleteGroup = ({ label, options, setValue }) => (
    <div style={{ flex: '1 1 48%' }}>
        <label style={{ paddingLeft: '10px', marginBottom: '5px', fontSize: '14px' }}>{label}</label>
        <Autocomplete
            isRequired
            defaultItems={options}
            placeholder="Seleccione"
            className="max-w-xs"
            onChange={(_, value) => setValue(value)}
        >
            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
    </div>
);

// Componente de entrada de archivo
const FileInput = ({ fileInputRef, seleccionarImagen }) => (
    <div style={{ flex: '1 1 48%' }}>
        <label style={{ paddingLeft: '10px', marginBottom: '5px', fontSize: '14px' }}>Imagen:</label>
        <input
            type="file"
            ref={fileInputRef}
            onChange={seleccionarImagen}
            style={{ display: 'none' }}
            accept="image/*"
        />
        <Button
            onClick={() => fileInputRef.current.click()}
            className="w-full border-2 border-[rgb(255,105,132)] bg-[rgb(244,244,245)]"
            color="default"
            variant="flat"
        >
            <span className="text-gray-500">Seleccionar imagen</span>
        </Button>
    </div>
);
