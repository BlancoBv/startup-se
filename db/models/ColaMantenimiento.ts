import {
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class ColaMantenimiento extends Model<
  InferAttributes<ColaMantenimiento>,
  InferCreationAttributes<ColaMantenimiento>
> {
  declare id: string;
  declare estatus: "en_cola" | "terminado" | "terminado_entregado";
  declare nombreCliente: string;
  declare numTel: string;
  declare correo: string;
  declare numSerieEquipo: string | null;
  declare marcaEquipo: string;
  declare razonEntrada: string;
  declare idUsuario: ForeignKey<number | null>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
