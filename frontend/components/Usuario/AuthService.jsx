import jwt_decode from "jwt-decode"; // Esta es la forma correcta de importar

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = 'TOKEN';
const USER = 'USER';

export async function checkTokenExpiration() {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
        return false;  // No hay token, ya ha expirado o el usuario no está logueado
    }

    try {
        const payload = decodeJWT(token);
        const expirationTime = payload.exp * 1000;  // Convertir a milisegundos

        if (expirationTime < Date.now()) {
            cerrarSesion();
            return false;  // Token expirado
        }

        return true;  // Token válido
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return false;  // Error al decodificar, consideramos el token inválido
    }
}



export const iniciarSesion = async (correoElectronico, contrasena) => {
    try {
        const response = await fetch(`${apiUrl}/auth/iniciar-sesion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: correoElectronico, contraseña: contrasena }),
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem(TOKEN, data.token);
            localStorage.setItem(USER, JSON.stringify(data.user));
            // alert(data.user.email)
            return { success: true, user: data.user, token: data.token };
        } else {
            return { success: false, message: 'Correo o contraseña incorrectos' };
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        return { success: false, message: 'Hubo un problema al intentar iniciar sesión.' };
    }
};



export const cerrarSesion = async () => {
    const token = localStorage.getItem(TOKEN);


    try {
        const response = await fetch(`${apiUrl}/auth/cerrar-sesion`, {
            method: 'POST', // Usamos POST para cerrar sesión
            headers: {
                'Content-Type': 'application/json', // Indicamos que el cuerpo es JSON
            },
            body: JSON.stringify({
                token: token, // Enviamos el token en el cuerpo de la solicitud
            }),
        });

        // Verificamos si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        }

        // Opcional: Puedes obtener la respuesta si es necesario
        const data = await response.json();
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER);


    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};



export const cambiarClave = async (contraseñaActual, contraseñaNueva, token) => {
    try {
        const response = await fetch(`${apiUrl}/auth/cambiar-clave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            },
            body: JSON.stringify({
                contraseñaActual,
                contraseñaNueva
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar la contraseña');
        }

        return await response.json(); // Devuelve la respuesta de la API
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error.message);
        throw error; // Lanza el error para manejarlo en el componente
    }
};




export async function registrarUsuario(userData) {
    try {
        const response = await fetch(`${apiUrl}/auth/registrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),  // Usamos los datos recibidos por parámetro
        });

        if (!response.ok) {
            throw new Error("Error al registrar el usuario");
        }

        const data = await response.json();
        console.log("Usuario registrado:", data);
        return data;
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error; // Lanzar el error para que puedas manejarlo más arriba si es necesario
    }
}


export const getToken = () => {
    const token = localStorage.getItem(TOKEN);
    return token;
};


export const getUser = () => {
    const user = localStorage.getItem(USER);
    return user;
};



// Función genérica para obtener datos de localStorage de manera segura
const getFromLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null; // Devuelve null si no se encuentra el dato
    }
    return null; 
};

export const getNombre = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.nombre : null; 
};

export const getRol = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.rol : null;
};

export const getApellido1 = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.apellido1 : null;
};

export const getApellido2 = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.apellido2 : null; 
};

export const getTelefono = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.tel : null;
};

export const getCorreo = () => {
    const user = getFromLocalStorage('USER');
    return user ? user.email : null;
};

export const getId = () => {
    return decodeJWT(localStorage.getItem(TOKEN)).id;
};


function decodeJWT(token) {
    const base64Url = token.split('.')[1];  // Obtener la segunda parte del JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Ajustar base64
    const decoded = JSON.parse(atob(base64));  // Decodificar y parsear a JSON
    return decoded;
}


