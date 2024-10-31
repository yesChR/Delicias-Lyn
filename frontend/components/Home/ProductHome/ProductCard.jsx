import { useState } from "react";
import { CgInfo } from "react-icons/cg";
import { BsFillCartPlusFill } from "react-icons/bs";
import ModalCarrito from "./ModalCarrito";
import { useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useCallback } from "react";
import Swal from "sweetalert2";

const ProductCard = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); // Disminuir la cantidad
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1); // Aumentar la cantidad
    };

    const ventanaDetalle = useCallback(() => {
        Swal.fire({
            title: "Detalles del producto",
            confirmButtonColor: "#ff6984",
            confirmButtonText: "Aceptar",
            html: "<p>El queque es de chocolate con lustre blanco y amarillo, incluye flores amarillas</p>"
        })
    }, []);

    return (
        <div className="bg-white text-black shadow-lg rounded-lg border border-pink-200 p-4 flex flex-col max-w-xs mx-auto">
            {/* Imagen del producto */}
            <Image
                src="/flores amarillas.jpeg"
                alt="Producto"
                className="w-full mb-4 rounded"
                width={140}
                height={100}
            />

            {/* Nombre del producto */}
            <h2 className="text-lg mb-2">Nombre del Producto</h2>

            <div className="flex w-full justify-center">
                {/* Fila con Precio y Selector de Cantidad */}
                <div className="flex justify-between mb-4 gap-8">
                    <span className="text-xl font-bold text-danger">₡ 20.000</span>
                    <div className="flex items-center">
                        <div className="relative flex items-center">
                            <button
                                type="button"
                                onClick={handleDecrement}
                                className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-2.5 h-2.5 text-principal" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                            />
                            <button
                                type="button"
                                onClick={handleIncrement}
                                className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-2.5 h-2.5 text-principal" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fila con botones */}
            <div className="flex justify-center">
                <Button onClick={ventanaDetalle} className="bg-btnSideBar2 text-black rounded-md px-4 py-2 hover:bg-principal flex items-center mr-4">
                    <span className="text-lg text-black cursor-pointer active:opacity-50 mr-2">
                        <CgInfo />
                    </span>
                    Detalles
                </Button>
                <Button onClick={onOpen} className="bg-btnSideBar2 text-black rounded-md px-4 py-2 hover:bg-principal flex items-center">
                    <span className="text-lg text-black cursor-pointer active:opacity-50 mr-2">
                        <BsFillCartPlusFill className="text-lg" />
                    </span>
                    Añadir
                </Button>
            </div>
            <ModalCarrito isOpen={isOpen} onOpenChange={onOpenChange}></ModalCarrito>
        </div>
    );
};

export default ProductCard;