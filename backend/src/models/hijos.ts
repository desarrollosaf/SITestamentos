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
import Matrimonio from './matrimonios';

class Hijos extends Model<
  InferAttributes<Hijos>,
  InferCreationAttributes<Hijos>
> {
  declare id: CreationOptional<number>;
  declare solicitudId: ForeignKey<string>;
  declare matrimonioId: ForeignKey<string>;
  declare nombre_completo: string;
  declare reconocido: boolean;
  declare fuera_de_matrimonio: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Hijos.init(
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
    matrimonioId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reconocido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fuera_de_matrimonio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    tableName: 'hijos',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: ['id'],
      },
    ],
  }
);

// Relaciones
Hijos.belongsTo(Solicitud, {
  foreignKey: 'solicitudId',
  as: 'solicitud',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Hijos.belongsTo(Matrimonio, {
  foreignKey: 'matrimonioId',
  as: 'matrimonio',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Hijos;
