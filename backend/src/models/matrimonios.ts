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
import Hijo from './hijos';

class Matrimonio extends Model<
  InferAttributes<Matrimonio>,
  InferCreationAttributes<Matrimonio>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare orden: number;
  declare nombre: string;
  declare primer_apellido: string;
  declare segundo_apellido: string;
  declare regimen_patrimonial: string;
  declare vive: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare solicitud?: Solicitud;
}

Matrimonio.init(
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
    orden: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    primer_apellido: {
      type: DataTypes.STRING,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
    },
    regimen_patrimonial: {
      type: DataTypes.STRING,
    },
    vive: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'matrimonios',
    timestamps: true,
  }
);

// Asociación con Solicitud
// Matrimonio.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Solicitud.hasMany(Hijo, {     
//   foreignKey: 'matrimonioId',
//   as: 'hijos',
// });

Matrimonio.hasMany(Hijo, {
  foreignKey: 'matrimonioId',
  as: 'hijos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Matrimonio;
