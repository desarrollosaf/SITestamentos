import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/testamentosConnection';

class Cita extends Model<
  InferAttributes<Cita>,
  InferCreationAttributes<Cita>
> {
  declare id: CreationOptional<number>;
  declare curp: string;
  declare fecha: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Cita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'citas',
    timestamps: true,
  }
);

export default Cita;
