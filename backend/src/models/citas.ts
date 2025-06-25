import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/testamentosConnection'; // Ajusta la ruta si es necesario

class Cita extends Model<
  InferAttributes<Cita>,
  InferCreationAttributes<Cita>
> {
  declare id: CreationOptional<number>;
  declare rfc: string | null;
  declare fecha: Date | null;
  declare hora: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Cita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'citas',
    timestamps: true, // Sequelize generará y actualizará automáticamente createdAt y updatedAt
  }
);

export default Cita;
