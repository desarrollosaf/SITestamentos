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
  declare nombre_completo: string;
  declare nombre_completo_asustituir: string;
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
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_completo_asustituir: {
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
HerederoSustituto.belongsTo(Solicitud, {
  foreignKey: 'solicitudId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default HerederoSustituto;
