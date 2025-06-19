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

class Herederos extends Model<
  InferAttributes<Herederos>,
  InferCreationAttributes<Herederos>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare nombre_completo: string | null;
  declare porcentaje: string | null;
  declare menor_edad: boolean | null;
  declare derecho_acrecer: boolean | null;
  declare tipo: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Herederos.init(
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
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    porcentaje: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    menor_edad: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    derecho_acrecer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tipo: {
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
    tableName: 'herederos',
    timestamps: true,
  }
);

// Relaciones
Herederos.belongsTo(Solicitud, {
  foreignKey: 'solicitudId',
  as: 'solicitud',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Herederos;
