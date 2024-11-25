import { Tamaño } from '../models/tamaño.model';

// Crear tamaño
export const crearTamaño = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevoTamaño = await Tamaño.create({ nombre });
        res.status(201).json({ message: "Tamaño creado exitosamente", tamaño: nuevoTamaño });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener todos los tamaños
export const obtenerTamaños = async (req, res) => {
    try {
        const tamaños = await Tamaño.findAll();
        res.status(200).json(tamaños);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener tamaño por ID
export const obtenerTamañoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tamaño = await Tamaño.findByPk(id);
        if (tamaño) {
            res.status(200).json(tamaño);
        } else {
            res.status(404).json({ error: "Tamaño no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar tamaño
export const actualizarTamaño = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const tamaño = await Tamaño.findByPk(id);
        if (tamaño) {
            await tamaño.update({ nombre });
            res.status(200).json({ message: "Tamaño actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "Tamaño no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar tamaño
export const eliminarTamaño = async (req, res) => {
    const { id } = req.params;
    try {
        const tamaño = await Tamaño.findByPk(id);
        if (tamaño) {
            await tamaño.destroy();
            res.status(200).json({ message: "Tamaño eliminado exitosamente" });
        } else {
            res.status(404).json({ error: "Tamaño no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
