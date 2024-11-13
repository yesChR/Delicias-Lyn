import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt"; // Importar bcrypt correctamente
import jwt from 'jsonwebtoken'; // Si estás usando ES6 modules
import config from "../config/config";
import transporter from "../config/nodemailer";
import crypto from 'crypto';


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




export const solicitarRecuperacion = async (req, res) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Generar un código de recuperación aleatorio
        const codigoVerificacion = crypto.randomInt(100000, 999999).toString();

        // Expiración del código en 10 minutos (600000 ms)
        const expiracion = Date.now() + 60000; // 30 segundos

        // Guardar el código y la expiración en el token
        await Usuario.update(
            { token: `${codigoVerificacion}-${expiracion}` }, // Código y expiración concatenados
            { where: { idUsuario: usuario.idUsuario } }
        );

     


        const formato = {
            from: config.email,
            to: correo,
            subject: 'Recuperación de contraseña',
            html: `
                <p>Hola,</p>
                <p>Tu código de recuperación es:</p>
                <h2 style="font-size: 24px; font-weight: bold;">${codigoVerificacion}</h2>
                <p>Este código expirará en <strong>60 segundos</strong>, por lo que te recomendamos ingresarlo lo antes posible.</p>
                <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
            `
        };
        
        await transporter.sendMail(formato);

        res.status(200).json({ message: 'Correo de recuperación enviado. Verifica tu bandeja de entrada.' });
    } catch (error) {
        console.error('Error al solicitar la recuperación:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};



export const resetearContraseña = async (req, res) => {
    const { correo, codigoIngresado, nuevaContraseña } = req.body;

    try {
        // Validación del correo, código ingresado y nueva contraseña
        if (!correo || !codigoIngresado || !nuevaContraseña) {
            return res.status(400).json({ message: 'El correo, código y la nueva contraseña son requeridos' });
        }

        // Buscar el usuario con el correo proporcionado
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(400).json({ message: 'Correo no encontrado' });
        }

        if (usuario.token === null) {
            return res.status(400).json({ message: 'Código de verificación no válido' });

        }
        // Verificar si el código coincide con el token almacenado en la base de datos
        const [codigo, expiracion] = usuario.token.split('-');
        if (codigo !== codigoIngresado) {
            return res.status(400).json({ message: 'Código de verificación no válido' });
        }



        // Verificar si el código ha expirado
        if (Date.now() > Number(expiracion)) {
            return res.status(400).json({ message: 'El código ha expirado' });
        }

        // Validar la nueva contraseña (por ejemplo, mínimo 8 caracteres)
        if (nuevaContraseña.length < 8) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }

        // Cifrar la nueva contraseña
        const contraseñaCifrada = await bcrypt.hash(nuevaContraseña, 10);

        // Actualizar la contraseña del usuario y marcar el token como "expirado" o "usado"
        await Usuario.update(
            {
                contraseña: contraseñaCifrada,
                token: 'token_default', // Marcar el token como expirado
            },
            { where: { idUsuario: usuario.idUsuario } }
        );


        const mailOptions = {
            from: config.email,
            to: correo,
            subject: 'Contraseña restablecida exitosamente',
            text: 'Tu contraseña ha sido restablecida correctamente.',
            html: '<p>Tu contraseña ha sido restablecida exitosamente.</p>',
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
