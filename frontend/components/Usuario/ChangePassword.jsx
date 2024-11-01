/**
 * Albin Liang 29/10/2024
 * 
 */

import { useCallback } from "react";
import Swal from "sweetalert2";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Asegúrate de importar FaEye y FaEyeSlash

export default function ChangePasswordModal({ isOpen, onOpenChange }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones para alternar la visibilidad de cada campo de contraseña
  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const ventana = useCallback((title, message) => {
    Swal.fire({
      icon: "success",
      title: title, // Dynamic title from argument
      text: message, // Dynamic text from argument
      showConfirmButton: false,
      timer: 1000
    });
  }, []);


  const ventanaCambioContraseña = () => {
    ventana("Contraseña actualizada correctamente", "Los cambios se han guardado correctamente.");
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
                  <div onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}>
                    {showConfirmPassword ? <FaEyeSlash className="text-2xl text-default-400" /> : <FaEye className="text-2xl text-default-400" />}
                  </div>
                }
                placeholder="Confirme la contraseña"
                type={showConfirmPassword ? "text" : "password"}
                variant="bordered"
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
                  ventanaCambioContraseña(); // Call your function to change the password
                  onClose(); // Call onClose as a function
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
