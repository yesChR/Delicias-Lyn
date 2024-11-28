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
import { resetearContraseña, solicitarReseteo, verificarCodigo } from './AuthService';
import { useFormik } from "formik";
import * as Yup from "yup";


const InputFieldText = ({ placeholder, type = "text", name, value, onChange, label }) => (
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
    label={label}
    color="danger"

  />

);

const PasswordInput = ({ placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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

    </>

  );
};

const InputEmailForm = ({ formData, handleChange, errors }) => (

  <>
    <div style={{ marginBottom: '10px' }}>

      <InputFieldText
        placeholder="Correo electrónico"
        name="email"
        onChange={handleChange}
        error={errors.email}
        value={formData.email}
        label='correo'
      />
      {errors.email && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errors.email}</div>}
    </div>

  </>
);

const InputTokenForm = ({ formData, handleChange, errors }) => (
  <>
    <div>
      <InputFieldText
        placeholder="Ingresa el código de verificación"
        name="codigoVerificacion"
        onChange={handleChange}
        label='código de identificación'
        error={errors.codigoVerificacion}
        value={formData.codigoVerificacion}


      />
      {errors.codigoVerificacion && <div style={{ color: 'red', fontSize: '12px', marginLeft: '7px' }}>{errors.codigoVerificacion}</div>}
    </div>

  </>
);

const InputNewPasswordForm = ({ formData, handleChange, errors }) => (
  <>
    <div style={{ marginBottom: '10px' }}>
      <PasswordInput
        placeholder="Nueva contraseña"
        name="contrasena"
        onChange={handleChange}
        error={errors.contrasena}

      />
      {errors.contrasena && <div style={{ color: 'red', fontSize: '12px', marginLeft: '7px' }}>{errors.contrasena}</div>}
    </div>
    <div style={{ marginBottom: '10px' }}>


      <PasswordInput
        placeholder="Confirmar contraseña"
        name="contrasenaRepetida"
        value={formData.contrasenaRepetida}
        onChange={handleChange}
        error={errors.contrasenaRepetida}

      />
      {errors.contrasenaRepetida && <div style={{ color: 'red', fontSize: '12px', marginLeft: '7px' }}>{errors.contrasenaRepetida}</div>}
    </div>

  </>
);

export default function AuthModal({ isOpen, onOpenChange }) {


  const handleNext = async (e) => {

    if (step === 1) {

      if (!formik.errors.email && formik.values.email) {
        
        try {
          // Llamada a la función que solicita el reseteo
           const result = await solicitarReseteo(formik.values.email);

          // Si la solicitud fue exitosa, avanza al siguiente paso
          setStep((prev) => prev + 1); // Avanza al siguiente paso
          formik.setFieldError('email', ''); // Limpiar el error de email
          formik.setFieldError('codigoVerificacion', 'Revise tu bandeja de entrada...');

        } catch (error) {
          formik.setFieldError('email', error.message || 'Error al solicitar reseteo');
          console.error(error);
        }
      }else{
        formik.setTouched({ ...formik.values }); // Marca todos los campos como tocados para mostrar errores

      }
    }

    // Si el paso es 2, simplemente avanza sin necesidad de una solicitud
    if (step === 2) {
      formik.setFieldError('codigoVerificacion', 'Enviando código...');
      if (!formik.errors.codigoVerificacion) {

      try {
        // Llamada a la función que solicita el reseteo
             const result = await verificarCodigo(formik.values.email, formik.values.codigoVerificacion);

        // Si la solicitud fue exitosa, avanza al siguiente paso
        setStep((prev) => prev + 1); // Avanza al siguiente paso
        formik.setFieldError('codigoVerificacion', ''); // Limpiar el error de email
      } catch (error) {
        formik.setFieldError('codigoVerificacion', error.message || 'Error al solicitar reseteo');
        console.error(error);
      }


    }else{
      formik.setTouched({ ...formik.values }); // Marca todos los campos como tocados para mostrar errores

    }
    }
  };





  const formik = useFormik({
    initialValues: {
      email: '',
      contrasena: '',
      codigoVerificacion: '',
      contrasenaRepetida: ''

    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
      codigoVerificacion: Yup.string()
        .length(6, "El código debe ser de 6 dígitos")
        .required("El código es obligatorio")
        .matches(/^[0-9]+$/, 'El código debe contener solo números')
      ,
      contrasena: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "La contraseña debe contener al menos un número")
        .matches(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
        .required("La contraseña es obligatoria"),
      contrasenaRepetida: Yup.string()
        .required('Debe repetir la contraseña')
    }),

    handleNext
  });


  const [step, setStep] = useState(1); // Track current step (1: email, 2: token, 3: password)
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleRecover = async () => {
    const errors = !formik.values.contrasenaRepetida || !formik.values.contrasena;
    const passwordMatch = formik.values.contrasenaRepetida === formik.values.contrasena;
    formik.setFieldError('contrasenaRepetida', 'Procesando...');

    if (!errors && passwordMatch) {




      try {
        // Llamada a la función que solicita el reseteo
        const result = await resetearContraseña(formik.values.email, formik.values.codigoVerificacion, formik.values.contrasenaRepetida);

        Swal.fire({
          icon: "success",
          title: "Recuperación exitosa",
          text: "Tu contraseña ha sido reseteada correctamente.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onOpenChange(false); // Close the modal after successful recovery

        });
        // Si la solicitud fue exitosa, avanza al siguiente paso
      } catch (error) {

      }
    } else if (!passwordMatch) {
      formik.setFieldError('contrasenaRepetida', 'Las contraseñas no coinciden...');

    }
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to step 1 (email)
      setFormData({
        email: "",
        contrasena: "",
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
        <ModalBody style={{ gap: "10px" }}>
          {step === 1 && (
            <InputEmailForm formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} />
          )}
          {step === 2 && (
            <InputTokenForm formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} />
          )}
          {step === 3 && (
            <InputNewPasswordForm formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} />
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
              auto flat onPress={() => {

                handleRecover();
              }}>
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
