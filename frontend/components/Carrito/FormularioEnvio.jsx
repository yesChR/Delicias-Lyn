import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  ModalContent,
  Tooltip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const FormularioEnvio = ({ isOpen, onOpenChange }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await fetch(`${apiUrl}/provincia/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setProvincias(data);
        } else {
          console.error("Error al cargar las provincias");
        }
      } catch (error) {
        console.error("Error al cargar las provincias", error);
      }
    };

    const fetchCantones = async () => {
      try {
        const response = await fetch(`${apiUrl}/canton/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setCantones(data);
        } else {
          console.error("Error al cargar los cantones");
        }
      } catch (error) {
        console.error("Error al cargar los cantones", error);
      }
    };

    const fetchDistritos = async () => {
      try {
        const response = await fetch(`${apiUrl}/distrito/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setDistritos(data);
        } else {
          console.error("Error al cargar los distritos");
        }
      } catch (error) {
        console.error("Error al cargar los distritos", error);
      }
    };

    fetchProvincias();
    fetchCantones();
    fetchDistritos();
  }, [apiUrl]);

  //validaciones para formulario, definir campos
  const schemaCompra = Yup.object({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(3, "Debe tener al menos 3 carácteres"),

    apellidoUno: Yup.string().required("El primer apellido es requerido"),

    apellidoDos: Yup.string().required("El segundo apellido es requerido"),

    correo: Yup.string()
      .email("Correo inválido")
      .required("El correo es requerido"),

    telefono: Yup.string()
      .matches(/^[0-9]{8}$/, "El número de teléfono debe tener 8 dígitos")
      .required("El teléfono es requerido"),

    fechaEntrega: Yup.date().required("La fecha de entrega es requerida"),

    metodoEntrega: Yup.string().required("El método de entrega es requerido"),

    metodoPago: Yup.string().required("El método de pago es requerido"),

    provincia: Yup.string().required("La provincia es requerida"),

    canton: Yup.string().required("El cantón es requerido"),

    distrito: Yup.string().required("El distrito es requerido"),

    direccionExacta: Yup.string().required("La dirección exacta es requerida"),
  });

  const formik = useFormik({
    //como se inicia el valor ejemplo si el input debe tener el nombre por defecto o no
    initialValues: {
      nombre: "",
      apellidoUno: "",
      apellidoDos: "",
      correo: "",
      telefono: "",
      fechaEntrega: "",
      metodoEntrega: "",
      metodoPago: "",
      provincia: "",
      canton: "",
      distrito: "",
      direccionExacta: "",
    },
    validationSchema: schemaCompra,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (!formik.isValid) return;

      try {
        // Aquí puedes hacer el request al backend si lo necesitas
        const response = await fetch(`${apiUrl}/pedido/crear`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Pedido creado exitosamente",
            showConfirmButton: false,
            timer: 1000,
          });
          resetForm();
          onOpenChange(false);
        } else {
          Swal.fire({
            title: "Error al guardar los datos",
            icon: "error",
            confirmButtonColor: "#fdc6c6",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error("Error al guardar los datos", error);
        Swal.fire({
          title: "Error al crear el pedido",
          icon: "error",
          confirmButtonColor: "#fdc6c6",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });

  const metodoEntrega = [
    { key: "presencial", label: "Presencial" },
    { key: "express", label: "Express" },
  ];

  const metodoPago = [
    { key: "efectivo", label: "En efectivo" },
    { key: "sinpe", label: "Por SINPE" },
  ];

  return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="w-full max-w-3xl mx-auto"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-principal font-bold text-xl flex justify-center">
                  Complete el formulario
                </h2>
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-1 gap-4 w-full p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Input
                      name="nombre"
                      type="text"
                      fullWidth
                      label="Nombre"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.nombre && formik.errors.nombre}
                      // errorMessage={formik.errors.nombre}
                      aria-describedby={`error-tooltip-${formik.touched.nombre ? 'nombre' : ''}`}
                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                      <Tooltip
                        content={formik.errors.nombre}
                        placement="right"
                        color="danger"
                        visible={formik.touched.nombre && !!formik.errors.nombre}
                      >
                        <span className="absolute top-4 right-8">⚠️</span>
                      </Tooltip>
                    )}
                  </div>
                    
                    <Input
                      name="apellidoUno"
                      type="text"
                      fullWidth
                      label="Apellido Uno"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.apellidoUno}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.apellidoUno && formik.errors.apellidoUno}
                      errorMessage={formik.errors.apellidoUno}
                    />
                    <Input
                      name="apellidoDos"
                      type="text"
                      fullWidth
                      label="Apellido Dos"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.apellidoDos}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.apellidoDos && formik.errors.apellidoDos}
                      errorMessage={formik.errors.apellidoDos}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="correo"
                      type="email"
                      fullWidth
                      label="Correo"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.correo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.correo && formik.errors.correo}
                      errorMessage={formik.errors.correo}
                    />
                    <Input
                      name="telefono"
                      type="tel"
                      fullWidth
                      label="Teléfono"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.telefono}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.telefono && formik.errors.telefono}
                      errorMessage={formik.errors.telefono}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="fechaEntrega"
                      type="date"
                      fullWidth
                      label="Fecha de entrega"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.fechaEntrega}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.fechaEntrega && formik.errors.fechaEntrega}
                      errorMessage={formik.errors.fechaEntrega}
                    />
                    <Select
                      name="metodoEntrega"
                      fullWidth
                      label="Método de entrega"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione método de entrega"
                      selectedKeys={[formik.values.metodoEntrega]}
                      onSelectionChange={(value) => formik.setFieldValue("metodoEntrega", value)}
                      isInvalid={formik.touched.metodoEntrega && formik.errors.metodoEntrega}
                    >
                      {metodoEntrega.map((metodo) => (
                        <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                      ))}
                    </Select>
                    {formik.touched.metodoEntrega && formik.errors.metodoEntrega ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.metodoEntrega}</div>
                    ) : null}
                    <Select
                      name="metodoPago"
                      fullWidth
                      label="Método de pago"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione método de pago"
                      selectedKeys={[formik.values.metodoPago]}
                      onSelectionChange={(value) => formik.setFieldValue("metodoPago", value)}
                    >
                      {metodoPago.map((metodo) => (
                        <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      name="provincia"
                      fullWidth
                      label="Provincia"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione la provincia"
                      selectedKeys={[formik.values.provincia]}
                      onSelectionChange={(value) => formik.setFieldValue("provincia", value)}
                      isInvalid={formik.touched.provincia && formik.errors.provincia}
                    >
                        <SelectItem key="limon" value="limon">
                          Limón
                        </SelectItem>
                    </Select>
                    {formik.touched.provincia && formik.errors.provincia ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.provincia}</div>
                    ) : null}

                    <Select
                      name="canton"
                      fullWidth
                      label="Cantón"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione el cantón"
                      selectedKeys={[formik.values.canton]}
                      onSelectionChange={(value) => formik.setFieldValue("canton", value)}
                      isInvalid={formik.touched.canton && formik.errors.canton}
                      >
                      {cantones.map((canton) => (
                        <SelectItem key={canton.id} value={canton.id}>
                        {canton.nombre}
                      </SelectItem>
                      ))}
                    </Select>
                    {formik.touched.canton && formik.errors.canton ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.canton}</div>
                    ) : null}

                    <Select
                      name="distrito"
                      fullWidth
                      label="Distrito"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      placeholder="Seleccione el distrito"
                      selectedKeys={[formik.values.distrito]}
                      onSelectionChange={(value) => formik.setFieldValue("distrito", value)}
                      isInvalid={formik.touched.canton && formik.errors.canton}
                    >
                      {distritos.map((distrito) => (
                        <SelectItem key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                      </SelectItem>
                      ))}
                    </Select>
                    {formik.touched.distrito && formik.errors.distrito ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.distrito}</div>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      name="direccionExacta"
                      type="text"
                      fullWidth
                      label="Dirección exacta"
                      variant="bordered"
                      color="danger"
                      className="text-black"
                      value={formik.values.direccionExacta}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.direccionExacta && formik.errors.direccionExacta}
                      errorMessage={formik.errors.direccionExacta}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button type="submit" color="danger" auto>
                  Enviar
                </Button>
                </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormularioEnvio;
