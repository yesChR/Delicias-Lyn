import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "../Iconos/MailIcon";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import ResetPasswordModal from './Reset';
import { useAuth } from '../../context/authContext';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { iniciarSesion, registrarUsuario } from './AuthService';

const InputField = ({ placeholder, type = "text", name, value, onChange, endContent, error }) => (
  <div style={{ width: '100%' }}>
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
      placeholder={placeholder}
      type={type}
      variant="bordered"
      name={name}
      value={value}
      onChange={onChange}
      endContent={endContent}
    />
    {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
  </div>
);


const LoginForm = ({ formData, handleChange, togglePasswordVisibility, showPassword, errors }) => (
  <>
    <InputField
      placeholder="Correo electrónico"
      name="correoElectronico"
      value={formData.correoElectronico}
      onChange={handleChange}
      endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
      error={errors.correoElectronico}
    />
    <InputField
      placeholder="Contraseña"
      name="contrasena"
      type={showPassword ? "text" : "password"}
      value={formData.contrasena}

      onChange={handleChange}
      endContent={
        <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
          {showPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
        </div>
      }
      error={errors.contrasena}
    />
  </>
);


const RegisterForm = ({ formData, handleChange, togglePasswordVisibility, showPassword, errors }) => (
  <>
    <InputField placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} error={errors.nombre} />
    <InputField placeholder="Primer apellido" name="primerApellido" value={formData.primerApellido} onChange={handleChange} error={errors.primerApellido} />
    <InputField placeholder="Segundo apellido" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} error={errors.segundoApellido} />
    <InputField placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} error={errors.telefono} />
    <InputField placeholder="Correo electrónico" name="correoElectronico" type="email" onChange={handleChange} error={errors.correoElectronico} />
    <InputField
      placeholder="Contraseña"
      name="contrasena"
      type={showPassword ? "text" : "password"}
      onChange={handleChange}
      endContent={
        <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
          {showPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
        </div>
      }
      error={errors.contrasena}
    />
  </>
);
export default function AuthModal({ isOpen, onOpenChange }) {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    correoElectronico: '',
    contrasena: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
  });

  const recargarPagina = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmitRegister = async () => {
    const errors = await formik.validateForm(); // Valida todos los campos

    if (Object.keys(errors).length === 0) { // Sin errores
      handleSubmit();
      onOpenChange(false); // Cierra el modal
      formik.setFieldValue('contrasena', '');

    } else {
      formik.setTouched({ ...formik.values }); // Marca todos los campos como tocados para mostrar errores
    }
  };


  const handleSubmitLogin = async () => {
    const areSpecificFieldsEmpty = !formik.values.correoElectronico || !formik.values.contrasena;
    const areSpecificFieldsValid = !formik.errors.correoElectronico && !formik.errors.contrasena;

    if (areSpecificFieldsValid && !areSpecificFieldsEmpty) {
      handleSubmit();
      onOpenChange(false); // Cierra el modal de login
    } else {
      formik.setTouched({ ...formik.values }); // Marca todos los campos como tocados para mostrar errores

    }

  };



  const handleSubmit = async (e) => {

    if (isLogin) {
      try {
        const correo = formik.values.correoElectronico;
        const contrasena = formik.values.contrasena;

        // Llamada al servicio para hacer el login
        const result = await iniciarSesion(correo, contrasena);

        if (result.success) {
          login(result.user, result.token);  // Almacena usuario y token en el contexto y localStorage
          Swal.fire({
            title: 'Autenticación',
            text: 'Ha sido autenticado correctamente.',
            icon: 'success',
            timer: 800,
            showConfirmButton: false
          });
         router.push('/');
        } else {
          Swal.fire({
            title: 'Error',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            // Cierra el modal de login solo después de que SweetAlert se cierre
            onOpenChange(true);
          });
        }
      } catch (err) {
        // En caso de error inesperado
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al intentar iniciar sesión.',
          icon: 'error',
        });
      }
    } else {
      const userData = {
        nombre: formik.values.nombre,
        apellidoUno: formik.values.primerApellido,
        apellidoDos: formik.values.segundoApellido,
        correo: formik.values.correoElectronico,
        telefono: formik.values.telefono,
        contraseña: formik.values.contrasena,
      };

      try {
        const result = await registrarUsuario(userData);
        // Al registrar al usuario, automáticamente lo logueamos
        const loginResult = await iniciarSesion(userData.correo, userData.contraseña);

        if (loginResult.success) {
          login(loginResult.user, loginResult.token);  // Almacena usuario y token en el contexto y localStorage

          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Te has registrado correctamente y has iniciado sesión.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: loginResult.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Cierra el modal de login solo después de que SweetAlert se cierre
          onOpenChange(true);
        });
      }
    }
  };





  const formik = useFormik({
    initialValues: {
      correoElectronico: '',
      contrasena: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
    },
    validationSchema: Yup.object({
      correoElectronico: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
      contrasena: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "La contraseña debe contener al menos un número")
        .matches(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
        .required("La contraseña es obligatoria"),
      nombre: Yup.string().required('El nombre es obligatorio').max(50, 'El nombre no debe tener más de 50 caracteres')
      ,

      primerApellido: Yup.string().required('El primer apellido es obligatorio').max(50, 'El nombre no debe tener más de 50 caracteres')
      ,

      segundoApellido: Yup.string().required('El segundo apellido es obligatorio')
        .max(50, 'El nombre no debe tener más de 50 caracteres')
      ,

      telefono: Yup.string()
        .matches(/^[0-9]+$/, 'El teléfono debe contener solo números') // Valida números
        .max(8, 'No puede ser mayor a 8 dígitos') // Limita a 11 dígitos
        .required('El código es obligatorio')
    }),

    handleSubmit
  });



  const handleToggleLogin = () => {
    setIsLogin((prev) => !prev); // Cambiar entre login y registro
  };

  const handleForgotPassword = () => {
    setIsResetPasswordModalOpen(true); // Abre el modal de restablecer contraseña
    onOpenChange(false); // Cierra el modal de login
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        style={{ borderRadius: "20px" }}
      >
        <ModalContent>
          <ModalHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "25px",
              marginTop: "25px",
              marginBottom: "5px",
              color: "rgb(255,105,132)",
            }}
          >
            {isLogin ? "Iniciar Sesión" : "Registro"}
          </ModalHeader>
          <ModalBody style={{ marginLeft: "5%", marginRight: "5%", gap: "20px" }}>
            {isLogin ? (
              <LoginForm
                formData={formik.values}
                handleChange={formik.handleChange}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                errors={formik.errors}
              />
            ) : (
              <RegisterForm
                formData={formik.values}
                handleChange={formik.handleChange}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                errors={formik.errors}
              />
            )}
          </ModalBody>
          <ModalFooter
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >


            {isLogin && (
              <Button
                style={{
                  marginTop: "10px",
                  backgroundColor: "rgb(255,105,132)",
                  color: "#ffffff",
                  width: "50%",
                  fontSize: "17px",
                  borderRadius: "20px",
                }}
                onPress={() => {
                  handleSubmitLogin();
                }}
              >
                Iniciar
              </Button>
            )}



            {!isLogin && (

              <Button
                style={{
                  marginTop: "10px",
                  backgroundColor: "rgb(255,105,132)",
                  color: "#ffffff",
                  width: "50%",
                  fontSize: "17px",
                  borderRadius: "20px",
                }}
                onPress={() => {

                  handleSubmitRegister();
                }}
              >
                Registrar
              </Button>

            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: '10px',
              }}
            >
              <Button
                style={{
                  marginBottom: "5px",
                  backgroundColor: "white",
                  color: "blue",
                  textDecoration: "underline",
                  width: "auto",
                  padding: "10px 20px",
                  padding: '0',
                }}
                onPress={handleToggleLogin}
              >
                {isLogin ? "Regístrate" : "¿Ya tienes una cuenta?"}
              </Button>

              {isLogin && (
                <Button
                  style={{
                    marginBottom: "5px",
                    backgroundColor: "white",
                    color: "blue",
                    textDecoration: "underline",
                    width: "auto",
                    padding: "10px 20px",
                    padding: '0',
                  }}
                  onClick={handleForgotPassword} // Esto cerrará el modal de login y abrirá el de reset
                >
                  ¿Olvidaste tu cuenta?
                </Button>
              )}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onOpenChange={setIsResetPasswordModalOpen}
      />
    </>
  );
}
