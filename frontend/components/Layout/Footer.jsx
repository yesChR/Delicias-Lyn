import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-principal text-white text-center py-2 relative z-40">
            <div className="flex justify-around">
                <div className="flex flex-col items-center">
                    <FaInstagram size={20} /> {/* Tamaño ajustado */}
                    <a href="https://www.instagram.com/delicias_lyn" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">@delicias_lyn</a> {/* Texto más pequeño */}
                </div>
                <div className="flex flex-col items-center">
                    <FaFacebookF size={20} />
                    <a href="https://www.facebook.com/p/Delicias-Lin-100063673236329/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Delicias Lin</a>
                </div>
                <div className="flex flex-col items-center">
                    <FaTiktok size={20} />
                    <a href="https://www.tiktok.com/@delicias_lyn" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">@Delicias_Lyn</a>
                </div>
                <div className="flex flex-col items-center">
                    <BsFillTelephoneFill size={20}/>
                    <span className="text-sm">8913-5112</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
