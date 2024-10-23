import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useState } from "react";
import WhatsappBtn from "./WhatsappBtn";

const Layout = ({ children }) => {
    const [estaAbierto, setEstaAbierto] = useState(false);

    const accionarSideBar = () => {
        setEstaAbierto(!estaAbierto);
    }

    return (
        <>
            <NavBar accionarSideBar={accionarSideBar}></NavBar>
            <SideBar estaAbierto={estaAbierto}></SideBar>
            <div className="w-full flex lg:justify-center justify-center">
                <main className={`h-[700px] transition-transform duration-300 ease-in-out ${estaAbierto ? 'lg:translate-x-[100px] w-full lg:w-[calc(100%-200px)] flex justify-center' : 'translate-x-0 w-full'}`}>
                    {children}
                </main>
            </div>
            <WhatsappBtn></WhatsappBtn>
            <Footer></Footer>
        </>
    );
}

export default Layout;

