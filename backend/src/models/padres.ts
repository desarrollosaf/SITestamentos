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

class Padre extends Model<
  InferAttributes<Padre>,
  InferCreationAttributes<Padre>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare tipo: string | null;
  declare nombre: string | null;
  declare primer_apellido: string | null;
  declare segundo_apellido: string | null;
  declare vive: number | null;
  declare nacionalidad: number | null;
  declare especifique_nacionalidad: string | null;
  declare updatedAt: CreationOptional<Date>;
}

Padre.init(
  {
    id: {
     type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    especifique_nacionalidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'padres',
    timestamps: false, // Solo tienes `updatedAt` en la migración, no `createdAt`
  }
);

// Relaciones
// Padre.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default Padre;
