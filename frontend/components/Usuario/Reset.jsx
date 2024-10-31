/**
 * Albin Liang 29/10/2024
 */
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputFieldText = ({ placeholder, type = "text", name, value, onChange }) => (
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
    name={name}
    value={value}
    onChange={onChange}
    variant="bordered"
  />
);

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
        <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
          {showPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
        </div>
      }
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      variant="bordered"
    />
  );
};

const InputNewPasswordForm = ({ formData, handleChange }) => (
  <>
    <InputFieldText
      placeholder="Correo electrónico"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
    <PasswordInput
      placeholder="Nueva contraseña"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />
    <PasswordInput
      placeholder="Confirmar contraseña"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
    />
  </>
);

const InputTokenForm = ({ formData, handleChange }) => (
  <>

    <InputFieldText
      placeholder="Ingresa el código de verificación"
      name="verificationCode" // Cambiado a "verificationCode" para mayor claridad
      value={formData.verificationCode}
      onChange={handleChange}
    />
  </>
);

export default function AuthModal({ isOpen, onOpenChange }) {
  const [isGetReset, setIsReset] = useState(true); // Estado inicial es true para mostrar el formulario de inicio de sesión
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "", // Asegúrate de incluir este campo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleNext = () => {
    // Lógica para el botón "Siguiente"
    console.log("Avanzar a la siguiente etapa");
    setIsReset(false); // Cambia a la siguiente pantalla o estado si es necesario
  };

  const mensaje = () => {
    onOpenChange(false); // Cierra el modal al enviar

    alert('Exitosamente');
  }



  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
    onOpenChange(false); // Cierra el modal al enviar
  };

  useEffect(() => {
    if (isOpen) {
      setIsReset(true); // Restablece a inicio de sesión cada vez que se abra el modal
      setFormData({ // Opcional: restablece los campos del formulario
        email: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
      });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}
      placement="top-center"
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
          Solicitar recuperación
        </ModalHeader>
        <ModalBody>
          {isGetReset ? (
            <InputNewPasswordForm formData={formData} handleChange={handleChange} />
          ) : (
            <InputTokenForm formData={formData} handleChange={handleChange} />
          )}
        </ModalBody>
        <ModalFooter
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
          {isGetReset ? (
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
              auto flat onPress={handleNext}>
              Siguiente
            </Button>) : (
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
                     auto flat onPress={mensaje}>
                     Recuperar
                   </Button>
          )}

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
