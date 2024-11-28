
import { useCallback } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Asegúrate de importar FaEye y FaEyeSlash
import { useFormik } from "formik";
import * as Yup from "yup";
import { cambiarClave } from "./AuthService";

export default function ChangePasswordModal({ isOpen, onOpenChange }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones para alternar la visibilidad de cada campo de contraseña
  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);





  const formik = useFormik({
    initialValues: {
      contrasena: '',
      contrasenaNueva: '',
      contrasenaRepetida: ''

    },
    validationSchema: Yup.object({
      contrasena: Yup.string()
        .required("Ingrese la contraseña actual"),


      contrasenaNueva: Yup.string()
        .min(8, "La contraseña nueva debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "La contraseña debe contener al menos un número")
        .matches(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
        .required("Ingrese la nueva contraseña"),
      contrasenaRepetida: Yup.string()
        .oneOf([Yup.ref('contrasenaNueva'), null], "Las contraseñas deben coincidir") // Validación añadida
        .required("Debe repetir la nueva contraseña")
    }),

  });


  const ventana = useCallback((title, message) => {
    Swal.fire({
      icon: "success",
      title: title, // Dynamic title from argument
      text: message, // Dynamic text from argument
      showConfirmButton: false,
      timer: 1000
    });
  }, []);



  const ventanaCambioContraseña = async (e) => {
    const errors = await formik.validateForm(); // Valida todos los campos

    try {
      if (Object.keys(errors).length === 0) {

        const result = await cambiarClave(formik.values.contrasena, formik.values.contrasenaRepetida);
        ventana("Contraseña actualizada correctamente", "Los cambios se han guardado correctamente.");
        onOpenChange(false)
      } else {
        formik.setTouched({ ...formik.values }); // Marca todos los campos como tocados para mostrar errores
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        onOpenChange(true);
      });
    }
  };

  return (
    <Modal
      style={{
        borderRadius: '20px',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '25px',
                marginTop: '25px',
                marginBottom: '5px',
                color: 'rgb(255,105,132)',
              }}
            >
              Cambiar contraseña
            </ModalHeader>
            <ModalBody style={{ marginLeft: '5%', marginRight: '5%', gap: '20px' }}>
              <Input
                classNames={{
                  inputWrapper: [
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                    "group-data-[focus=true]:border-[rgb(255_155_130)]",
                    "rounded-[25px]",
                    "min-h-[45px]",
                  ],
                }}
                endContent={
                  <div onClick={toggleCurrentPasswordVisibility} style={{ cursor: "pointer" }}>
                    {showCurrentPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
                  </div>
                }
                placeholder="Contraseña actual"
                type={showCurrentPassword ? "text" : "password"}
                variant="bordered"
                name="contrasena"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.contrasena && formik.errors.contrasena}
                errorMessage={formik.errors.contrasena}
              />
              <Input
                classNames={{
                  inputWrapper: [
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                    "group-data-[focus=true]:border-[rgb(255_155_130)]",
                    "rounded-[25px]",
                    "min-h-[45px]",
                  ],
                }}
                endContent={
                  <div onClick={toggleNewPasswordVisibility} style={{ cursor: "pointer" }}>
                    {showNewPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
                  </div>
                }
                placeholder="Nueva contraseña"
                type={showNewPassword ? "text" : "password"}
                variant="bordered"
                onChange={formik.handleChange}
                name="contrasenaNueva"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.contrasenaNueva && formik.errors.contrasenaNueva}
                errorMessage={formik.errors.contrasenaNueva} />

              <Input
                classNames={{
                  inputWrapper: [
                    "border-[rgb(255_105_132)]",
                    "hover:border-[rgb(255_80_100)]",
                    "focus:border-[rgb(255_95_130)]",
                    "group-data-[focus=true]:border-[rgb(255_155_130)]",
                    "rounded-[25px]",
                    "min-h-[45px]",
                  ],
                }}
                endContent={
                  <div onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}>
                    {showConfirmPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
                  </div>
                }
                placeholder="Confirme la contraseña"
                type={showConfirmPassword ? "text" : "password"}
                variant="bordered"
                onChange={formik.handleChange}
                name="contrasenaRepetida"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.contrasenaRepetida && formik.errors.contrasenaRepetida}
                errorMessage={formik.errors.contrasenaRepetida}
              />
            </ModalBody>
            <ModalFooter
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Button
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  backgroundColor: "rgb(255,105,132)",
                  color: "#ffffff",
                  width: "50%",
                  fontSize: "17px",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  ventanaCambioContraseña();
                }}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
