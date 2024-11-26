import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useState } from "react";
import WhatsappBtn from "./WhatsappBtn";
import { checkTokenExpiration } from '../Usuario/AuthService';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext'; // Corregir la ruta
import { useRouter } from 'next/router';



const Layout = ({ children }) => {
    const [estaAbierto, setEstaAbierto] = useState(false);
    const { isLoggedIn } = useAuth(); // Accede a la propiedad de autenticación
    const router = useRouter();


    const accionarSideBar = () => {
        setEstaAbierto(!estaAbierto);
    }
    useEffect(() => {
        let interval;

        if (isLoggedIn) {  // Comprueba si el usuario está logueado
            interval = setInterval(async () => {
                const tokenValid = await checkTokenExpiration();  // Verifica el token

                if (!tokenValid) {  
                    clearInterval(interval);  
                    window.location.href = '/'; 
                }
            }, 3600000); 
        }

        return () => clearInterval(interval);  // Limpia el intervalo al desmontar el componente
    }, [isLoggedIn]);  //

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

