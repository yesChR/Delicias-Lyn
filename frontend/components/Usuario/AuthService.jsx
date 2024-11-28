// import jwt_decode from "jwt-decode"; // Esta es la forma correcta de importar

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


export const cambiarClave = async (contraseñaActual, contraseñaNueva) => {
    try {
        const token = getToken(); // Llama a la función para obtener el token

        if (!token) {
            throw new Error("Token de autenticación no disponible");
        }

        const response = await fetch(`${apiUrl}/auth/cambiar-clave`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Utiliza el token
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
            body: JSON.stringify(userData),
        });

        // Convertir la respuesta a JSON incluso si no es 'ok'
        const data = await response.json();

        if (!response.ok) {
            // Captura el mensaje de error del servidor
            const errorMessage = data.message || "Error desconocido al registrar el usuario";
            throw new Error(errorMessage); // Lanzar con mensaje específico
        }

        console.log("Usuario registrado:", data);
        return data; // Devuelve los datos de usuario registrados con éxito
    } catch (error) {
        console.error("Error en el registro:", error.message);
        throw error; // Lanza el error para manejarlo en el componente
    }
}




export async function solicitarReseteo(correo) {
    const response = await fetch(`${apiUrl}/auth/solicitar-recuperacion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }), // Corregido: Envía un objeto con la propiedad 'correo'
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || 'Error desconocido');
    }
    return responseData;
}


export async function verificarCodigo(correo, codigoIngresado) {
    const response = await fetch(`${apiUrl}/auth/validar/codigo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, codigoIngresado }), // Corregido: Envía un objeto con la propiedad 'correo'
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || 'Error desconocido');
    }
    return responseData;
}



export async function resetearContraseña(correo, codigoIngresado, nuevaContraseña) {
    const response = await fetch(`${apiUrl}/auth/resetear`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, codigoIngresado , nuevaContraseña}), // Corregido: Envía un objeto con la propiedad 'correo'
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || 'Error desconocido');
    }
    return responseData;
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
    if (typeof window === 'undefined') {
        return null; // Si no estamos en el lado del cliente, devolvemos null
    }

    const token = localStorage.getItem(TOKEN);
    if (token) {
        return decodeJWT(token).id;
    }
    return null; // Si no hay token, devolvemos null
};


function decodeJWT(token) {
    const base64Url = token.split('.')[1];  // Obtener la segunda parte del JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Ajustar base64
    const decoded = JSON.parse(atob(base64));  // Decodificar y parsear a JSON
    return decoded;
}


