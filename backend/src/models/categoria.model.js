import { DataTypes } from "sequelize";
import { sequelize } from "../bd_config/conexion";
import { Subcategoria } from "./subcategoria.model";

export const Categoria = sequelize.define("categoria", {
    idCategoria: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement:true
    },
    nombre: DataTypes.STRING,
}, {
    freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
    tableName: 'categoria',   // De manera opcional, puedes especificar el nombre exacto de la tabla
  });


//Relacionar modelo con subcategoria
//el 1...
Categoria.hasMany(Subcategoria,{
    foreignKey: "idCategoria", // La columna en subcategoria que apunta a idCategoria(foranea)
    sourceKey: "idCategoria", // (campo al que referencia en este modelo)
    as:"subcategoria"
});

//va al muchos
Subcategoria.belongsTo(Categoria,{
    foreignKey: "idCategoria", // La clave foránea en subcategoria
    targetKey: "idCategoria", // La clave primaria en categoria
    as:"categoria"
});



