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
  declare nombre_heredero: string;
  declare primer_apellido_heredero: string;
  declare segundo_apellido_heredero: string;
  declare edad: number;
  declare parentesco: string;
  declare porcentaje: string;
  declare derecho_acrecer: boolean;

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
      allowNull: false,
    },
    primer_apellido_heredero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido_heredero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentesco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    derecho_acrecer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
