import { Link } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const WhatsappBtn = () => {
    return (
        <Link
            className="fixed bottom-3 right-5 rounded-full text-white shadow-lg hover:bg-gray-400 focus:outline-none z-50"
            href="https://wa.me/89135112">
            <Image src="/whatsapp.png" width={60} height={60}
            />
        </Link>
    );
}

export default WhatsappBtn;