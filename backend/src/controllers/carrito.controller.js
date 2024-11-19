import { Carrito } from '../models/carrito.model';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';
import { Tamaño } from '../models/tamaño.model';

//  Agregar un Producto al Carrito
export const agregarProductoCarrito = async (req, res) => {
    const { idUsuario, idProducto, idTamaño, cantidad, personalizacion } = req.body;

    try {
        // Buscar si ya existe el producto en el carrito del usuario
        let productoEnCarrito = await Carrito.findOne({ where: { idUsuario, idProducto } });

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
            productoEnCarrito.montoXCantidad = productoEnCarrito.cantidad * (await Producto.findByPk(idProducto)).precio;
            await productoEnCarrito.save(); //El Save es util a la hora de guardar datos que requieren calculos o que se modifican constantemente antes de hacer la persistencia
        } else {
            // Si el producto no está en el carrito, lo ingresa
            const producto = await Producto.findByPk(idProducto); //Busca el producto
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const nuevoProductoEnCarrito = await Carrito.create({
                idUsuario,
                idProducto,
                idTamaño,
                cantidad,
                montoXCantidad: producto.precio * cantidad,
                personalizacion
            });
            productoEnCarrito = nuevoProductoEnCarrito;
        }

        return res.status(201).json(productoEnCarrito);
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
};

//  Visualizar el carrito de un usuario
// -> Pendiente los tamañosxProducto, que es tabla relacional <-
export const visualizarCarrito = async (req, res) => { 
    const { idUsuario } = req.params;

    try {
        const carrito = await Carrito.findAll({
            where: { idUsuario },
            attributes: ["id", "idProducto", "idTamaño", "cantidad", "montoXCantidad", "personalizacion"]
        });

        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado para el usuario' });
        }

        //Obtener productos y tamaños para cada ítem del carrito
        const carritoCompleto = await Promise.all(
            carrito.map(async (item) => {
                const producto = await Producto.findByPk(item.idProducto, {
                    attributes: ["nombre", "precio", "descripcion"]
                });

                const tamaño = await Tamaño.findByPk(item.idTamaño, {
                    attributes: ["nombre"]
                });

                return {
                    ...item.dataValues,
                    producto,
                    tamaño
                };
            })
        );

        return res.status(200).json(carritoCompleto);
    } catch (error) {
        return res.status(500).json({ error: 'Error al visualizar el carrito del usuario' });
    }
};


//  Actualizar la Cantidad de un Producto en el Carrito
export const actualizarCantidadCarrito = async (req, res) => {
    const {idProducto } = req.params;
    const { idUsuario, nuevaCantidad} = req.body;

    try {
        const productoEnCarrito = await Carrito.findOne({ where: { idUsuario, idProducto } });

        if (!productoEnCarrito) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito del usuario' });
        }

        productoEnCarrito.cantidad = nuevaCantidad;
        productoEnCarrito.montoXCantidad = nuevaCantidad * (await Producto.findByPk(idProducto)).precio;

        await productoEnCarrito.save();//Mejor save ya que permite hacer multiples modificaciones o hacer los calculos y luego persistir los datos

        return res.status(200).json(productoEnCarrito);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
};

//  Eliminar un Producto del Carrito
export const eliminarProductoCarrito = async (req, res) => {
    const { idUsuario, idProducto } = req.params;

    try {
        const productoEnCarrito = await Carrito.findOne({ where: { idUsuario, idProducto } });

        if (!productoEnCarrito) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito del usuario' });
        }

        await productoEnCarrito.destroy();

        return res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
};
