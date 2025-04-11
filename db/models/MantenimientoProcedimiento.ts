import {
  Model,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export default class MantenimientoProcedimiento extends Model<
  InferAttributes<MantenimientoProcedimiento>,
  InferCreationAttributes<MantenimientoProcedimiento>
> {
  declare idMantenimiento: ForeignKey<string>;
  declare idProcedimiento: ForeignKey<number>;
}
