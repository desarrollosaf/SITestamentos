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

class HerederoSustituto extends Model<
  InferAttributes<HerederoSustituto>,
  InferCreationAttributes<HerederoSustituto>
> {
  declare id: CreationOptional<number>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare nombre_sustituto: string;
  declare primer_apellido_sustituto: string;
  declare segundo_apellido_sustituto: string;
  declare nombre_a_sustituir: string;
  declare primer_apellido_a_sustituir: string;
  declare segundo_apellido_a_sustituir: string;
  declare derecho_acrecer: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

HerederoSustituto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre_sustituto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     primer_apellido_sustituto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     segundo_apellido_sustituto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_a_sustituir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primer_apellido_a_sustituir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido_a_sustituir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    derecho_acrecer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'herederos_sustitutos',
    timestamps: true,
  }
);

// Relación con Solicitud
// HerederoSustituto.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default HerederoSustituto;
