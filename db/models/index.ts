import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import Usuarios from "./Usuarios";
import Servicios from "./Servicios";
import ColaMantenimiento from "./ColaMantenimiento";
import Procedimiento from "./Procedimientos";
import MantenimientoProcedimiento from "./MantenimientoProcedimiento";
import Precios from "./Precios";
import bcrypt from "bcrypt";

ColaMantenimiento.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    estatus: {
      type: DataTypes.ENUM("en_cola", "terminado", "terminado_entregado"),
      allowNull: false,
    },
    nombreCliente: { type: DataTypes.STRING(100), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    numTel: { type: DataTypes.CHAR(10), allowNull: false },
    correo: { type: DataTypes.STRING(45), allowNull: false },
    numSerieEquipo: { type: DataTypes.STRING(45) },
    marcaEquipo: { type: DataTypes.STRING(20), allowNull: false },
    razonEntrada: { type: DataTypes.TEXT("tiny"), allowNull: false },
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "cola_mantenimiento", freezeTableName: true }
);

Procedimiento.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.TEXT("tiny"), allowNull: false },
    idServicio: { type: DataTypes.INTEGER },
    costo: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    idMantenimiento: { type: DataTypes.UUID, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "procedimientos" }
);

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

MantenimientoProcedimiento.init(
  {
    idMantenimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: ColaMantenimiento, key: "id" },
    },
    idProcedimiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Procedimiento, key: "id" },
    },
  },
  {
    sequelize,
    tableName: "mantenimiento_has_procedimientos",
    timestamps: false,
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

Precios.init(
  {
    idPrecio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    monto: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "precios" }
);

ColaMantenimiento.hasMany(Procedimiento, {
  foreignKey: "idMantenimiento",
  as: "procedimientos",
});
Procedimiento.belongsTo(ColaMantenimiento, {
  foreignKey: "idMantenimiento",
});

export { Usuarios, Servicios, Precios, ColaMantenimiento, Procedimiento };
