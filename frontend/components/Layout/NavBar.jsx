import { Input } from "@nextui-org/input";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHome } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { Source_Serif_4 } from "next/font/google";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import LoginModal from "../Usuario/Auth"; // Asegúrate de especificar la ruta correcta
import ResetModal from "../Usuario/Reset"; // Asegúrate de especificar la ruta correcta
import ChangePasswordModal from "../Usuario/ChangePassword"; // Asegúrate de especificar la ruta correcta
import { useState, useEffect } from "react";
import { getApellido1, getApellido2, getNombre, cerrarSesion } from '../Usuario/AuthService';


/** */

const sourceSerif = Source_Serif_4({
    weight: ['600'],  // Pesos disponibles: 200, 300, 400, 500, 600, 700, 900
    subsets: ['latin'],  // Subconjuntos disponibles: latin, latin-ext
});

const NavBar = ({ accionarSideBar }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isResetOpen, setIsResetOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);


    const [estaAutenticado, setEstaAutenticado] = useState(false);

    // Función para verificar si el token existe en localStorage
    const checkToken = () => {
        return localStorage.getItem('TOKEN') !== null;
    };

    // Actualizar el estado de autenticación cada vez que el componente se renderiza o cuando se borra el token
    useEffect(() => {
        setEstaAutenticado(checkToken());
    }, []); // Se ejecuta solo una vez cuando el componente se monta

    // Función para manejar el logout
    const handleLogout = () => {
        cerrarSesion();
        setEstaAutenticado(false); // Actualiza el estado a no autenticado
        //   window.location.href = '/'; // Redirige a la página principal (inicio)
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER');

        Swal.fire({
            title: 'Cierre de sesión',
            text: 'Ha sido cerrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000,
        });
    };


    return (
        <header>
            <div className="z-50">
                <div className="bg-principal z-50 max-h-[60px] flex items-center justify-between px-4 relative">
                    {/* Contenedor para los elementos de la izquierda */}
                    <div className="flex items-center space-x-2">
                        <Image src={"/Logo.png"} width={57} height={50} className="transform scale-85" alt="Logo" />
                        <div className={`${sourceSerif.className} flex flex-col mt-1`}>
                            <div className="mb-[-11px]"> {/* Ajuste en el div que envuelve "Delicias" */}
                                <p className="text-[18px] text-white">Delicias</p>
                            </div>
                            <div className="mt-0"> {/* Puedes ajustar el margen superior aquí si es necesario */}
                                <p className="text-[28px] text-white">Lyn</p>
                            </div>
                        </div>
                    </div>



                    {/* Barra de búsqueda y enlace "Nosotros" centrados */}
                    <div className="flex w-full">
                        <div className="flex items-center w-full justify-center">
                            {/* Input que ocupa 3/4 del espacio */}
                            <div className="w-2/4 lg:ml-32 ml-10">
                                <Input
                                    type="text"
                                    className="w-full h-full shadow-md rounded-full"
                                    size="sm"
                                    fullWidth
                                    radius="full"
                                    placeholder="Buscar..."
                                    labelPlacement="outside"
                                    endContent={<FiSearch className="text-principal font-bold" />}
                                    css={{
                                        '&::placeholder': {
                                            fontSize: '1rem',
                                            color: '#888888',
                                        },
                                    }}
                                />
                            </div>
                            {/* Enlace que ocupa 1/4 del espacio */}
                            <div className="w-1/4 lg:ml-10 ml-8">
                                <Link href="/sobre-nosotros" className="text-white hover:underline">
                                    <div>Nosotros</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-secundario z-50 max-h-[30px] shadow-md relative">
                    <div className="w-full h-full flex justify-between">
                        <div className="flex space-x-1 ml-5"> {/* Cambiar espacio a 1 */}
                            <Button className="h-full min-w-[2px] mb-2 bg-transparent hover:bg-gray-200" onClick={accionarSideBar}>
                                <RxHamburgerMenu className="text-xl" />
                            </Button>
                            <Button as={Link} href="/" className="h-full min-w-[2px] mb-2 bg-transparent hover:bg-gray-200">
                                <IoHome className="text-xl" />
                            </Button>
                        </div>
                        <div className="flex space-x-1 mr-5"> {/* Cambiar espacio a 1 */}
                            <Button href={"/carrito"}
                                as={Link} className="h-full min-w-[2px] mb-2 bg-transparent hover:bg-gray-200">
                                <TiShoppingCart className="text-2xl" />
                            </Button>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button onClick={() => setEstaAutenticado(checkToken)} className="h-full min-w-[2px] mb-2 bg-transparent hover:bg-gray-200">
                                        <FaUserAlt className="text-lg" />
                                    </Button>

                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">

                                    {estaAutenticado && (
                                        <DropdownItem key="usuario" >
                                            <b>  {getNombre() + " " + getApellido1() + " " + getApellido2()} </b>
                                        </DropdownItem>
                                    )}
                                    {!estaAutenticado && (
                                        <DropdownItem key="login" onPress={() => setIsLoginOpen(true)}>
                                            Iniciar sesión
                                        </DropdownItem>
                                    )}

                                    {estaAutenticado && (
                                        <DropdownItem key="cambiarContraseña" onPress={() => setIsChangePasswordOpen(true)}>
                                            Cambiar contraseña
                                        </DropdownItem>
                                    )}

                                    {estaAutenticado && (

                                        <DropdownItem key="cerrarSesion" onPress={() => handleLogout()} className="text-danger" color="danger">
                                            Cerrar sesión
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales */}
            <ResetModal
                isOpen={isResetOpen}
                onOpenChange={setIsResetOpen}
                onLoginOpen={() => {
                    setIsResetOpen(false); // Cerrar el modal de restablecimiento
                    setIsLoginOpen(true); // Abrir el modal de inicio de sesión
                }}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onOpenChange={setIsLoginOpen}
                onResetOpen={() => {
                    setIsLoginOpen(false); // Cerrar el modal de inicio de sesión
                    setIsResetOpen(true); // Abrir el modal de restablecimiento
                }}
            />

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onOpenChange={setIsChangePasswordOpen}
                onChangePassword={() => {
                    setIsChangePasswordOpen(true); // Esta función puede ser modificada para abrir otros modales si es necesario
                }}
            />

        </header>
    );
}

export default NavBar;
