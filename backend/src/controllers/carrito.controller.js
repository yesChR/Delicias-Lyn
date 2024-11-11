import { Carrito } from "../models/carrito.models";
import { Producto } from "../models/producto.models";

export const agregarProductoCarrito = async (req, res) => {
    const { idUsuario, idProducto, cantidad, montoXCantidad } = req.body;
    try {
      const productoCarrito = await Carrito.findOne({ where: { idUsuario, idProducto } });
      if (productoCarrito) {
        // Si ya existe, se actualiza la cantidad y el monto
        productoCarrito.cantidad += cantidad;
        productoCarrito.montoXCantidad += montoXCantidad;
        await productoCarrito.save();
      } else {
        // Si no existe, se crea un nuevo registro
        await Carrito.create({ idUsuario, idProducto, cantidad, montoXCantidad });
      }
      res.status(201).json({ message: "Producto agregado al carrito exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  };
  
  export const visualizarCarrito = async (req, res) => {
    const { idUsuario } = req.params;
    try {
      const carrito = await Carrito.findAll({
        where: { idUsuario },
        include: {
          model: Producto,
          as: "producto",
          attributes: ["idProducto", "nombre", "descripcion", "precio", "imagen"], // Incluye los atributos relevantes del producto
        },
      });
      res.status(200).json(carrito);
    } catch (error) {
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  };
  
  export const eliminarProductoCarrito = async (req, res) => {
    const { idProducto } = req.params;
    try {
      const productoCarrito = await Carrito.findOne({ where: { idProducto } });
      if (productoCarrito) {
        await productoCarrito.destroy();
        res.status(204).json({ message: "Producto eliminado del carrito" });
      } else {
        res.status(404).json({ error: "Producto no encontrado en el carrito" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  };