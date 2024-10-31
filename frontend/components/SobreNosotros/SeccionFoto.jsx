


// CardsSection.js
import { Card, CardBody, Image } from "@nextui-org/react";

const CardsSection = () => {
    return (
        <div className="contenedor-cartas flex flex-col md:flex-row justify-center items-stretch gap-6 p-4 mt-8 max-w-7xl mx-auto" 
        style={{ gap: "1.5rem" }}>
            <Card className="w-full md:w-1/3 lg:w-1/4 min-h-[300px]">
                <CardBody className="p-0">
                    <Image
                        alt="Card image 1"
                        className="w-full h-full object-cover"
                        src="/ImagenLyn.jpg"
                    />
                </CardBody>
            </Card>

            <Card className="w-full md:w-2/3 lg:w-3/4 min-h-[300px]">
                <CardBody className="flex flex-col justify-center items-center p-4 bg-[rgb(253,214,214)]">
                    <div className="image-container flex flex-col md:flex-row" style={{ width: '100%' }}>
                        <div style={{ width: '100%', margin: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '0%' }}>
                            <div style={{ display: 'block', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '30px', margin: '0', fontWeight: 'bold' }}>Delicias Lyn</h3>
                                <p style={{ fontSize: '20px', margin: '0', paddingBottom: '20px' }}>~El amor, hecho sabor!~</p>
                                <p style={{ fontSize: '20px', margin: '0', paddingBottom: '20px' }}>Esta empresa se caracteriza por ofrecer productos de calidad y personalizados.</p>
                            </div>
                        </div>

                        <div style={{ width: '100%', margin: '0px', padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '70%', margin: '0px', padding: '0px', display: 'flex', justifyContent: 'center', }}>
                                <Image
                                    alt="Logo"
                                    src="LogoLyn.png"
                                    className="image1"
                                    style={{ maxWidth: '100%', height: 'auto' }} // Asegura que la imagen se ajuste
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardsSection;
