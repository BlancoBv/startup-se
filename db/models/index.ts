import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import Usuarios from "./Usuarios";
import Servicios from "./Servicios";
import Precios from "./Precios";
import bcrypt from "bcrypt";

Usuarios.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: { type: DataTypes.STRING(45), allowNull: false },
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    apellidos: { type: DataTypes.STRING(40), allowNull: false },
    password: { type: DataTypes.TEXT("tiny"), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    idRol: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "usuarios",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

Servicios.init(
  {
    idServicio: { type: DataTypes.NUMBER, primaryKey: true, allowNull: false },
    nombre: { type: DataTypes.STRING(20), allowNull: false },
    descripcion: { type: DataTypes.TEXT("tiny"), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    idPrecio: { type: DataTypes.NUMBER },
  },
  { sequelize, tableName: "servicios" }
);

export { Usuarios, Servicios, Precios };
