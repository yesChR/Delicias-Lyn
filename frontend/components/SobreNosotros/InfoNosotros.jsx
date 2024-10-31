// App.js
import { useState } from "react";
import { Pagination } from "@nextui-org/react";
import CardsSection from "./SeccionFoto"; // Asegúrate de importar correctamente
import TestimonialsSection from "./Testimonios"; // Asegúrate de importar correctamente

const ITEMS_PER_PAGE = 1; // Número de cartas por página

const cardsData = [
    { id: 1, title: "ArielMonestelSolís", description: "Sus productos son deliciosos. Sigue en adelante. Dios bendiga y prospere tu negocio. ❤️✨" },
    { id: 2, title: "jacqueline6373", description: "Dios bendiga tus manos ❤️❤️❤️ y esa familia tan linda que tienes, muchos éxitos." },
    { id: 3, title: "shanicehamiltonfuller1809", description: "Muchas bendiciones y éxitos para Delicias Lyn ❤️❤️❤️" },
];

export default function App() {
    const [currentPage, setCurrentPage] = useState(1);

    // Cálculo de cartas para la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCards = cardsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(cardsData.length / ITEMS_PER_PAGE);

    return (
        <div>
            <CardsSection />
            <TestimonialsSection currentCards={currentCards} />
            {/* Componente de Paginación */}
            <div className="flex justify-center items-center mt-6">
                <Pagination
                    total={totalPages}
                    color="danger"
                    initialPage={currentPage}
                    showControls
                    style={{ padding: '0', marginBottom: '20px' }}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
