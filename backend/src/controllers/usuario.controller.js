export const enviarId = async (req, res) => {
    const { id } = req.params; // Asumimos que el id se pasa como parámetro en la URL
    const { nombre, apellidoUno, apellidoDos, correo } = req.body;

    console.log(`ID: ${id}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Apellido Uno: ${apellidoUno}`);
    console.log(`Apellido Dos: ${apellidoDos}`);
    console.log(`Correo: ${correo}`);

    res.status(200).send({ message: "Datos recibidos", id, nombre, apellidoUno, apellidoDos, correo });
};
