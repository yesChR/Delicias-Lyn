"use client";

//import { useRouter } from 'next/router';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, ModalContent, Select, SelectItem, Spinner, } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getId } from '../Usuario/AuthService';

const metodoEntrega = [
  { key: "1", label: "Presencial" },
  { key: "2", label: "Express" },
];

const metodoPago = [
  { key: "1", label: "En efectivo" },
  { key: "2", label: "Por SINPE" },
];


const FormularioEnvio = ({ isOpen, onOpenChange, montoTotal, formEnvioSelect, recargar }) => {
  //const router = useRouter();

  //aqui tengo el valor de la ruta del .env
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const idUsuario = getId();
    setUserId(idUsuario);
  })

  // Cargar provincia desde la API
  useEffect(() => {
    const fetchProvincia = async () => {
      try {
        const response = await fetch(`${apiUrl}/provincia/visualizar/limon`);
        if (response.ok) {
          const data = await response.json();
          setProvincias([data]);
          console.log(provincias)
        } else {
          Swal.fire({
            title: "Error al cargar las provincias",
            icon: "error",
            confirmButtonColor: "#fdc6c6",
            showConfirmButton: false,
            timer: 1000
          });
        }
      } catch (error) {
        console.error("Error al obtener las provincias", error);
        Swal.fire({
          title: "Error al obtener las provincias",
          icon: "error",
          confirmButtonColor: "#fdc6c6",
          showConfirmButton: false,
          timer: 1000
        });
      }
    };
    fetchProvincia();
  }, []);

  const schemaFormEnvio = Yup.object({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .min(3, "Debe tener al menos 3 carácteres"),
    apellidoUno: Yup.string()
      .required("El primer apellido es requerido")
      .min(3, "Debe tener al menos 3 carácteres"),
    apellidoDos: Yup.string()
      .required("El segundo apellido es requerido")
      .min(3, "Debe tener al menos 3 carácteres"),
    correo: Yup.string()
      .required("El correo es requerido")
      .email("Debe ser un correo electrónico válido")
      .min(3, "Debe tener al menos 3 carácteres"),
    telefono: Yup.string()
      .required("El teléfono es requerido")
      .min(8, "Debe tener al menos 8 carácteres"),
    fechaEntrega: Yup.date()
      .required("La fecha es requerida")
      .min(
        new Date(new Date().setDate(new Date().getDate() + 7)), // 7 días después de hoy
        "La fecha debe ser al menos una semana después de hoy"),// Asegura que la fecha sea al menos hoy
    metodoEntrega: Yup.number()
      .required("El método de entrega es requerido"),
    metodoPago: Yup.number()
      .required("El método de pago es requerido"),
    idProvincia: Yup.number()
      .required("La provincia es requerida"),
    idCanton: Yup.number()
      .required("El cantón es requerido"),
    idDistrito: Yup.number()
      .required("El distrito es requerido"),
    direccionExacta: Yup.string()
      .required("La dirección exacta es requerida"),
    idUsuario: Yup.number()
      .required("El usuario es requerido"),
    idEstado: Yup.number()
      .required("El usuario es requerido"),
    prioridad: Yup.number()
      .required("La prioridad es requerido"),
    montoTotal: Yup.number()
      .required("El monto es requerido"),
  });


  // Inicializar Formik con los valores de la subcategoría seleccionada
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidoUno: "",
      apellidoDos: "",
      correo: "",
      telefono: "",
      fechaEntrega: "",
      metodoEntrega: "",
      metodoPago: "",
      idProvincia: "",
      idCanton: "",
      idDistrito: "",
      direccionExacta: "",
      idEstado: "1",
      idUsuario: userId,
      prioridad: "1",
      montoTotal: montoTotal,
    },
    validationSchema: schemaFormEnvio,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log("Values", values);
      if (!formik.isValid) return;
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/pedido/crear`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Pedido creado exitosamente",
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            recargar();
            onOpenChange(false);
          });
          resetForm();
          // Redirigir al Home después de que el pedido sea exitoso
          window.location.href = "/";
        } else {
          Swal.fire({
            title: "No hay elementos en el carrito",
            icon: "error",
            confirmButtonColor: "#fdc6c6",
            showConfirmButton: false,
            timer: 1000
          });
        }
      } catch (error) {
        console.error("Error al crear el pedido", error);
        Swal.fire({
          title: "Error al crear el pedido",
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"outside"}
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
                  <div className="grid grid-cols-1 gap-2 w-full p-4 overflow-y">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        name="idUsuario"
                        type="number"
                        label="idUsuario"
                        variant="bordered"
                        color="danger"
                        value={formik.values.idUsuario}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hidden
                      />
                      <input
                        name="idEstado"
                        type="number"
                        label="idEstado"
                        variant="bordered"
                        color="danger"
                        value={formik.values.idEstado}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hidden
                      />
                      <input
                        name="prioridad"
                        type="number"
                        label="prioridad"
                        variant="bordered"
                        color="danger"
                        value={formik.values.prioridad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hidden
                      />
                      <input
                        name="montoTotal"
                        type="number"
                        label="montoTotal"
                        variant="bordered"
                        color="danger"
                        value={formik.values.montoTotal}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hidden
                      />
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
                        errorMessage={formik.errors.nombre}
                      />
                      <Input
                        name="apellidoUno"
                        type="text"
                        fullWidth
                        label="Primer apellido"
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
                        label="Segundo apellido"
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
                        className="text-gray-500"
                        value={formik.values.fechaEntrega}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.fechaEntrega && formik.errors.fechaEntrega}
                        errorMessage={formik.errors.fechaEntrega}
                      />
                      <Select
                        name="metodoEntrega"
                        value={formik.values.metodoEntrega}  // Vincular el valor de idCategoria
                        /*agregar el onchange */
                        onBlur={formik.handleBlur}
                        fullWidth
                        label="Método de entrega"
                        variant="bordered"
                        color="danger"
                        className="text-black"
                        placeholder="Seleccione método de entrega"
                        isInvalid={formik.touched.metodoEntrega && formik.errors.metodoEntrega}
                        errorMessage={formik.errors.metodoEntrega}
                        onChange={(value) => { formik.setFieldValue("metodoEntrega", value.target.value); }}
                      >
                        {metodoEntrega.map((metodo) => (
                          <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        name="metodoPago"
                        value={formik.values.metodoPago}  // Vincular el valor de idCategoria
                        onBlur={formik.handleBlur}
                        fullWidth
                        label="Método de pago"
                        variant="bordered"
                        color="danger"
                        className="text-black"
                        placeholder="Seleccione método de pago"
                        isInvalid={formik.touched.metodoPago && formik.errors.metodoPago}
                        errorMessage={formik.errors.metodoPago}
                        onChange={(value) => { formik.setFieldValue("metodoPago", value.target.value); }}
                      >
                        {metodoPago.map((metodo) => (
                          <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        name="idProvincia"
                        value={formik.values.idProvincia}
                        onBlur={formik.handleBlur}
                        fullWidth
                        label="Provincia"
                        variant="bordered"
                        color="danger"
                        className="text-black"
                        placeholder="Seleccione la provincia"
                        isInvalid={formik.touched.idProvincia && formik.errors.idProvincia}
                        errorMessage={formik.errors.idProvincia}
                        onChange={(value) => { formik.setFieldValue("idProvincia", value.target.value); }}
                      >
                        {provincias.map((provincia) => (
                          <SelectItem key={provincia.idProvincia}>{provincia.nombre}</SelectItem>
                        ))}
                      </Select>


                      <Select
                        name="idCanton"
                        value={formik.values.idCanton}  // Vincular el valor de idCategoria
                        onBlur={formik.handleBlur}
                        fullWidth
                        label="Cantón"
                        variant="bordered"
                        color="danger"
                        className="text-black"
                        placeholder="Seleccione el cantón"
                        isInvalid={formik.touched.idCanton && formik.errors.idCanton}
                        errorMessage={formik.errors.idCanton}
                        onChange={(value) => { formik.setFieldValue("idCanton", value.target.value); }}
                      >

                        <SelectItem key={provincias[0].canton[0].idCanton}>{provincias[0].canton[0].nombre}</SelectItem>

                      </Select>


                      <Select
                        name="idDistrito"
                        value={formik.values.idDistrito}
                        onBlur={formik.handleBlur}
                        fullWidth
                        label="Distrito"
                        variant="bordered"
                        color="danger"
                        className="text-black"
                        placeholder="Seleccione el distrito"
                        isInvalid={formik.touched.idDistrito && formik.errors.idDistrito}
                        errorMessage={formik.errors.idDistrito}
                        onChange={(value) => { formik.setFieldValue("idDistrito", value.target.value); }}
                      >
                        <SelectItem key={provincias[0].canton[0].distrito[0].idDistrito}>{provincias[0].canton[0].distrito[0].nombre}</SelectItem>
                      </Select>


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
                      <div className="mt-2 py-1 flex justify-end space-x-2">
                        <Button color="danger" variant="light" onPress={onClose}>
                          Cerrar
                        </Button>
                        <Button type="submit" color="danger">
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </div>
                  {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-700 z-10">
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="border-4 border-t-4 border-gray-300 border-t-danger rounded-full w-10 h-10 animate-spin"></div>
                        <span className="text-white">Espere un momento...</span>
                      </div>
                    </div>
                  )}

                </ModalBody>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormularioEnvio;
