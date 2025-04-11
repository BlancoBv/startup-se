import {
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class Procedimiento extends Model<
  InferAttributes<Procedimiento>,
  InferCreationAttributes<Procedimiento>
> {
  declare id: CreationOptional<number>;
  declare descripcion: string;
  declare idServicio: ForeignKey<number>;
  declare costo: number;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
}
