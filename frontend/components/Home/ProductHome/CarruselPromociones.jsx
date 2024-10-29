import "slick-carousel/slick/slick.css"; // Dependencia del carrusel
import "slick-carousel/slick/slick-theme.css"; // Dependencia del carrusel
import React from "react";
import Slider from "react-slick"; // Dependencia del carrusel
import ProductCard from "./ProductCard"; // Asegúrate de que este componente exista

const CarrusellPromociones = () => {
    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3, // Muestra 3 elementos a la vez
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1, // En pantallas pequeñas, muestra 1
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // En pantallas medianas, muestra 2
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="max-w-[985px] mx-auto bg-secundario text-black shadow-2xl rounded-lg p-10">
            <p className="text-principal flex justify-center text-[18px] font-bold mb-5">Promociones Disponibles</p>
            <Slider {...settings} className="relative z-20">
                {[...Array(6)].map((_, index) => ( // Generar 6 ProductCards
                    <div key={index} className="pr-2 pl-2">
                        <ProductCard/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarrusellPromociones;
