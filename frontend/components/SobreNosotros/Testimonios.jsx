// TestimonialsSection.js
import { Card, CardBody } from "@nextui-org/react";
import { IoPersonCircle } from "react-icons/io5";

const TestimonialsSection = ({ currentCards }) => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 style={{ color: 'rgb(255, 105, 132)', marginTop: '25px',  marginBottom: '20px', fontWeight: 'bold', fontSize: '25px', textAlign: 'center' }}>Testimonios</h2>
            <div className="contenedor-cartas flex flex-col md:flex-row justify-center items-center gap-6">
                {currentCards.map((card) => (
                    <Card key={card.id} className="w-full md:w-1/3 lg:w-1/4 min-h-[200px] mx-auto" style={{ width: '80%', minHeight: '100px' }}>
                        <CardBody style={{ background: 'rgb(253,177,177)' }} className="p-4 flex flex-col justify-start items-start">
                            <div className="flex items-center">
                                <IoPersonCircle style={{ fontSize: '30px' }} className="mr-2" />
                                <h3 style={{ color: 'white', fontSize: '14px' }} className="font-bold text-left">{card.title}</h3>
                            </div>
                            <p style={{ margin: '5px 33px 0 33px' }} className="text-sm mt-2 text-left">{card.description}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
