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

class Albacea extends Model<
  InferAttributes<Albacea>,
  InferCreationAttributes<Albacea>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare nombre_albacea: string | null;
  declare primer_apellido_albacea: string | null;
  declare segundo_apellido_albacea: string | null;
  declare nombre_falta_albacea: string | null;
  declare primer_apellido_falta_albacea: string | null;
  declare segundo_apellido_falta_albacea: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Albacea.init(
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
    nombre_albacea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido_albacea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_albacea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_falta_albacea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido_falta_albacea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_falta_albacea: {
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
    tableName: 'albaceas',
    timestamps: true,
  }
);

// Relaciones
// Albacea.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default Albacea;
