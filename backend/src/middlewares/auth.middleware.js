// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

/**
 * 
 *  Este archivo sirve para comprobar si el token recibido es válido o que este autenticado el usuario que lo
 * envio.
 * 
 *  Si el token es válido, extrae el ID de usuario (idUsuario) y el rol (rol) del token decodificado .
 * 
 * Al final la funcion se usa para proteger las rutas en donde solo usuarios autorizados pueden accederlos.
 */



export const validarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Suponiendo que el token se envía en el encabezado Authorization como "Bearer <token>"


    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token de autenticación.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }

        req.idUsuario = decoded.id; // Guardamos el id del usuario en el objeto de la solicitud
        req.userRole = decoded.rol; // Guardamos el rol del usuario en el objeto de la solicitud
        next();
    });
};


