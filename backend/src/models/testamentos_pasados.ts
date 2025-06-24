import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../database/testamentosConnection';
import Solicitud from './solicitud';

class TestamentoPasados extends Model<
  InferAttributes<TestamentoPasados>,
  InferCreationAttributes<TestamentoPasados>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare fecha_tramite: Date | null;
  declare notaria: string | null;
  declare instrumento_volumen: string | null;
  declare path_testamento: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TestamentoPasados.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fecha_tramite: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    notaria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instrumento_volumen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path_testamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'testamentos_pasados',
    timestamps: true,
  }
);

// Relaciones
// TestamentoPasados.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default TestamentoPasados;
