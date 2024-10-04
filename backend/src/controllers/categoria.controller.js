export const crearCategoria = async (req, res) => {
    const { idCategoria } = req.params; 
    const { nombre } = req.body;

    console.log(`ID: ${idCategoria}`);
    console.log(`Nombre Categoria: ${nombre}`);

    res.status(200).send({ message: "Datos", idCategoria, nombre });
};
