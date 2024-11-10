import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt"; // Importar bcrypt correctamente
import jwt from 'jsonwebtoken'; // Si estás usando ES6 modules
import config from "../config/config";
import transporter from "../config/nodemailer";

/**
 * Funciones:
 * registro, inicio sesion, cierre sesion, cambio contraseña y reseteo
 */


/**
 * Registrar usuario 
 * El rol del usuario es 1 y esta predefinido (Podemos cambiarlo por si acaso). 
 * El campo token no se genera, pero se guarda como default_token
 * 
 */

export const registrar = async (req, res) => {
    const { nombre, apellidoUno, apellidoDos, correo, contraseña, telefono } = req.body;
    try {
        if (!correo) {
            return res.status(400).json({ message: 'El campo correo es obligatorio.' });
        }
        if (!contraseña) {
            return res.status(400).json({ message: 'El campo contraseña es obligatorio.' });
        }
        const existeUsuario = await Usuario.findOne({ where: { correo } });
        if (existeUsuario) {
            return res.status(400).json({ message: `Ya existe un usuario con el correo: ${correo}` });
        }
        const contraseñaCifrada = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            apellidoUno,
            apellidoDos,
            correo,
            telefono,
            contraseña: contraseñaCifrada,
            rol: 1,
            token: 'token_default' // Puedes usar un valor predeterminado o null
        });

        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al registrar el usuario.', error: error.message });
    }
}

/**
 * Inicia la sesion, genera un token de sesión que se guarda
 * en la tabla de usuarios.
 * Este token esta firmado por una clave secreta que esta en el .ENV
 * El tiempo de expiración o validez del token es de 1 hora (3600s)
 * 
 
 */




export const iniciarSesion = async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Verifica que JWT_SECRET esté definido
        if (!config.authjwtsecret) {
            return res.status(500).json({ message: 'Error del servidor: La clave no está configurado.' });
        }

        const token = jwt.sign({
            id: usuario.idUsuario,
            rol: usuario.rol
        }, process.env.JWT_SECRET, { expiresIn: '3600s' });

        await Usuario.update({ token }, { where: { idUsuario: usuario.idUsuario } });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                nombre: usuario.nombre,
                rol: usuario.rol,
                apellido1: usuario.apellidoUno,
                apellido2: usuario.apellidoDos,
                email: usuario.correo,
                tel: usuario.telefono
            }
        });
    } catch (error) {
        console.error('Error en iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


/**
 * Elimina el token de la base de datos y lo pone en null
 */

export const cerrarSesion = async (req, res) => {
    const { token } = req.body; // Asume que el token se envía en la solicitud

    try {
        const usuario = await Usuario.findOne({ where: { token } });
        if (!usuario) {
            return res.status(404).json({ message: 'Token no válido o ya cerrado sesión.' });
        }
        await Usuario.update({ token: null }, { where: { idUsuario: usuario.idUsuario } });

        res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al cerrar sesión.' });
    }
};



/**
 * El req.idUsuario se obtiene del middleware de validar token y a la vez este decodifica el token
 * 
 */
export const cambiarContraseña = async (req, res) => {
    const { contraseñaActual, contraseñaNueva } = req.body;
    // Validar la entrada
    if (!contraseñaActual || !contraseñaNueva) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Obtener el usuario autenticado (el middleware ya verificó si el usuario es válido)
        const usuario = await Usuario.findOne({ where: { idUsuario: req.idUsuario } });
        // Verificar la contraseña actual
        const contrasenaValida = await bcrypt.compare(contraseñaActual, usuario.contraseña);
        if (!contrasenaValida) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta del usuario' });
        }

        // Cifrar la nueva contraseña
        const contraseñaNuevaCifrada = await bcrypt.hash(contraseñaNueva, 10);

        // Actualizar la contraseña en la base de datos
        await Usuario.update({ contraseña: contraseñaNuevaCifrada }, { where: { idUsuario: usuario.idUsuario } });

        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};





// Solicitar recuperación de contraseña
export const solicitarRecuperacion = async (req, res) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const token = jwt.sign({ id: usuario.idUsuario }, config.authjwtsecret, { expiresIn: '10m' });


        const formato = {
            from: config.email,
            to: correo,
            subject: 'Recuperación de contraseña',
            text: `Recibiste el código o token para restablcer la contraseña`,
            html: `
            <p>Tu token de restablecimiento de contraseña es:</p>
            <div style="background-color: #f4f4f4; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-family: monospace; font-size: 14px; color: #333; white-space: pre-wrap; word-wrap: break-word;">
                <strong>${token}</strong>
            </div>
            <p style="font-size: 14px; color: #555;">
                Debes copiar el token manualmente</b>
            </p>
        `

        };

        await transporter.sendMail(formato);

        res.status(200).json({ message: 'Correo de recuperación enviado. Verifica tu bandeja de entrada.' });
    } catch (error) {
        console.error('Error al solicitar la recuperación:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};




// Resetear contraseña
export const resetearContraseña = async (req, res) => {
    const { token, nuevaContraseña } = req.body;

    try {
        // Validación de token
        if (!token) {
            return res.status(400).json({ message: 'Token es requerido' });
        }

        // Verificar y decodificar el token
        let datosDecodificados;
        try {
            datosDecodificados = jwt.verify(token, config.authjwtsecret);
        } catch (err) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Buscar usuario basado en el payload del token
        const usuario = await Usuario.findOne({ where: { idUsuario: datosDecodificados.id } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar la nueva contraseña (ejemplo: mínimo 8 caracteres)
        if (nuevaContraseña.length < 8) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }

        // Cifrar la nueva contraseña
        const contraseñaCifrada = await bcrypt.hash(nuevaContraseña, 10);

        // Actualizar la contraseña del usuario
        await Usuario.update({ contraseña: contraseñaCifrada }, { where: { idUsuario: usuario.idUsuario } });

        // Responder con éxito
        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};