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
  declare id: CreationOptional<number>;
  declare solicitudId: ForeignKey<string>;
  declare tipo: string;
  declare nombre_completo: string;
  declare vive: boolean;
  declare nacionalidad: string;
  declare updatedAt: CreationOptional<Date>;
}

Padre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    nacionalidad: {
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
Padre.belongsTo(Solicitud, {
  foreignKey: 'solicitudId',
  as: 'solicitud',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Padre;
