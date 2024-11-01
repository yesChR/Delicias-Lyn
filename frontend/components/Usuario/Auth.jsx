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
import Swal from 'sweetalert2'; // Import SweetAlert2

const InputField = ({ placeholder, type = "text", name, value, onChange, endContent }) => (
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
);

const LoginForm = ({ formData, handleChange, togglePasswordVisibility, showPassword }) => (
  <>
    <InputField
      placeholder="Correo electrónico"
      name="correoElectronico"
      value={formData.correoElectronico}
      onChange={handleChange}
      endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
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
    />
  </>
);

const RegisterForm = ({ formData, handleChange }) => (
  <>
    <InputField placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
    <InputField placeholder="Primer apellido" name="primerApellido" value={formData.primerApellido} onChange={handleChange} />
    <InputField placeholder="Segundo apellido" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} />
    <InputField placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
    <InputField placeholder="Correo electrónico" name="correoElectronico" type="email" value={formData.correoElectronico} onChange={handleChange} />
    <InputField placeholder="Contraseña" name="contrasena" type="password" value={formData.contrasena} onChange={handleChange} />
  </>
);

export default function AuthModal({ isOpen, onOpenChange }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    correoElectronico: '',
    contrasena: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      alert(JSON.stringify(formData, null, 2)); // Show alert for login
    } else {
      // Show SweetAlert for registration
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Te has registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 1000

      });
    }
    
    // Reset form data after submission
    setFormData({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      correoElectronico: '',
      contrasena: '',
    });
  };

  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between login and register
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      style={{ borderRadius: "20px" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
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
                  formData={formData}
                  handleChange={handleChange}
                  togglePasswordVisibility={togglePasswordVisibility}
                  showPassword={showPassword}
                />
              ) : (
                <RegisterForm
                  formData={formData}
                  handleChange={handleChange}
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
                  handleSubmit();
                  onClose();
                }}
              >
                {isLogin ? "Iniciar" : "Registrarse"}
              </Button>
              <Button
                style={{
                  marginBottom: "5px",
                  backgroundColor: "white",
                  color: "blue",
                  width: "50%",
                  textDecoration: "underline",
                }}
                onPress={handleToggle}
              >
                {isLogin ? "Regístrate" : "¿Ya tienes una cuenta?"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
