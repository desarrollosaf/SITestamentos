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

class Heredero extends Model<
  InferAttributes<Heredero>,
  InferCreationAttributes<Heredero>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare nombre_heredero: string | null;
  declare primer_apellido_heredero: string | null; 
  declare segundo_apellido_heredero: string | null;
  declare edad: number | null;
  declare parentesco: string | null;
  declare porcentaje: string | null;
  declare derecho_acrecer: number | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Heredero.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre_heredero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido_heredero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_heredero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parentesco: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    porcentaje: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    derecho_acrecer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'herederos',
    timestamps: true,
  }
);

// Relación con Solicitud
// Heredero.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default Heredero;
