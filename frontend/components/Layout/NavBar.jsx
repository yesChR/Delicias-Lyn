import { Input } from "@nextui-org/input";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHome } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { Source_Serif_4 } from '@next/font/google';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import {Link} from "@nextui-org/react";

const sourceSerif = Source_Serif_4({
    weight: ['600'],  // Pesos disponibles: 200, 300, 400, 500, 600, 700, 900
    subsets: ['latin'],  // Subconjuntos disponibles: latin, latin-ext
});

const NavBar = ({ accionarSideBar }) => {
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
                                <Link href={"/"} className="text-white hover:underline">Nosotros</Link>
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
                                    <Button className="h-full min-w-[2px] mb-2 bg-transparent hover:bg-gray-200">
                                        <FaUserAlt className="text-lg" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="usuario">Usuario</DropdownItem>
                                    <DropdownItem key="cambiarContraseña">Cambiar contraseña</DropdownItem>
                                    <DropdownItem key="resetearContraseña">Resetear contraseña</DropdownItem>
                                    <DropdownItem key="cerrarSesion" className="text-danger" color="danger">
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>



        </header>
    );
}

export default NavBar;
