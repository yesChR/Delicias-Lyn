// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
// middlewares/auth.middleware.js
import rateLimit from 'express-rate-limit';



/**
 * Middleware para validar el token JWT y verificar si el usuario está autenticado.
 * Si el token es válido, extrae el ID de usuario (idUsuario) y el rol (rol) del token decodificado.
 * Este middleware protege las rutas que solo los usuarios autorizados pueden acceder.
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


export const limitarIntentos = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos (corrige el comentario de 15 minutos)
    max: 5, // Límite de 5 solicitudes por IP
    message: 'Demasiados intentos, por favor intente de nuevo más tarde.'
});

