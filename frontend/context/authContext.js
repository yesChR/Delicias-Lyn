// AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('USER');
        const storedToken = localStorage.getItem('TOKEN');
        
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    // Función para iniciar sesión
    const login = (userData, token) => {
        localStorage.setItem('USER', JSON.stringify(userData));
        localStorage.setItem('TOKEN', token);
        setUser(userData);
        setToken(token);
    };

    // Función para cerrar sesión
    const resetContext = () => {
        setUser(null);
        setToken(null);
    };

    // Verificar si el usuario está logueado
    const isLoggedIn = !!user && !!token;  // Convierte a booleano

    return (
        <AuthContext.Provider value={{ user, token, login, resetContext, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
