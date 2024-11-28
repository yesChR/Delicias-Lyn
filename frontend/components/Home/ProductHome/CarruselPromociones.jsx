import "slick-carousel/slick/slick.css"; // Dependencia del carrusel
import "slick-carousel/slick/slick-theme.css"; // Dependencia del carrusel
import React from "react";
import Slider from "react-slick"; // Dependencia del carrusel
import ProductCard from "./ProductCard"; // Asegúrate de que este componente exista

const CarrusellPromociones = ({ productos }) => {
    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: productos.length > 1, // Solo habilita infinito si hay más de un producto
        speed: 800,
        slidesToShow: productos.length > 3 ? 3 : productos.length, // Ajusta el número de elementos a mostrar
        slidesToScroll: 1,
        arrows: productos.length > 1, // Muestra flechas solo si hay más de un producto
        autoplay: productos.length > 1, // Solo activa autoplay si hay más de un producto
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: productos.length >= 1 ? 1 : 0, // Ajusta para pantallas pequeñas
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: productos.length > 2 ? 2 : productos.length, // Ajusta para pantallas medianas
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="max-w-[985px] mx-auto bg-secundario text-black shadow-2xl rounded-lg p-10">
            <p className="text-principal flex justify-center text-[18px] font-bold mb-5">Promociones Disponibles</p>
            {productos && productos.length > 0 ? (
                <Slider {...settings} className="relative z-20">
                    {productos.slice(0, 6).map((producto, index) => (
                        <div className="pr-2 pl-2" key={index}>
                            <ProductCard producto={producto} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-center">No hay productos disponibles</p>
            )}
        </div>
    );
};

export default CarrusellPromociones;