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
import Swal from "sweetalert2";

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

const PasswordInput = ({ placeholder, value, onChange, name }) => {
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
      name={name}
      variant="bordered"
    />
  );
};

const InputEmailForm = ({ formData, handleChange }) => (
  <>
    <InputFieldText
      placeholder="Correo electrónico"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
  </>
);

const InputTokenForm = ({ formData, handleChange }) => (
  <InputFieldText
    placeholder="Ingresa el código de verificación"
    name="verificationCode"
    value={formData.verificationCode}
    onChange={handleChange}
  />
);

const InputNewPasswordForm = ({ formData, handleChange }) => (
  <>
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

export default function AuthModal({ isOpen, onOpenChange }) {
  const [step, setStep] = useState(1); // Track current step (1: email, 2: token, 3: password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1); // Go to next step
  };

  const handleRecover = () => {
    Swal.fire({
      icon: "success",
      title: "Recuperación exitosa",
      text: "Tu contraseña ha sido reseteada correctamente.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      onOpenChange(false); // Close the modal after successful recovery
    });
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to step 1 (email)
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
      });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
          {step === 1 && (
            <InputEmailForm formData={formData} handleChange={handleChange} />
          )}
          {step === 2 && (
            <InputTokenForm formData={formData} handleChange={handleChange} />
          )}
          {step === 3 && (
            <InputNewPasswordForm formData={formData} handleChange={handleChange} />
          )}
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
          {step < 3 ? (
            <Button
              style={{
                marginTop: "10px",
                backgroundColor: "rgb(255,105,132)",
                color: "#ffffff",
                width: "50%",
                fontSize: "17px",
                borderRadius: "20px",
              }}
              auto flat onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button
              style={{
                marginTop: "10px",
                backgroundColor: "rgb(255,105,132)",
                color: "#ffffff",
                width: "50%",
                fontSize: "17px",
                borderRadius: "20px",
              }}
              auto flat onClick={handleRecover}>
              Recuperar
            </Button>
          )}

          <Button
            style={{
              backgroundColor: "white",
              color: "blue",
              textDecoration: "underline",
              width: "auto",
              padding: "10px 20px",
              padding: '0',
            }}
            onClick={() => onOpenChange(false)} // Close the modal
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
