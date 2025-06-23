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

class Hijo extends Model<
  InferAttributes<Hijo>,
  InferCreationAttributes<Hijo>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare matrimonioId: ForeignKey<Matrimonio['id']> | null;

  declare nombre: string;
  declare primer_apellido: string;
   declare segundo_apellido: string;
  declare edad: number | null;
  declare vive: string | null;
  declare reconocido: boolean;
  declare fuera_de_matrimonio: boolean;
  declare nombre_fuera: string;
  declare primer_apellido_fuera_matri: string |null;
  declare segundo_apellido_fuera_matri: string |null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Hijo.init(
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
    matrimonioId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vive: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reconocido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fuera_de_matrimonio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    nombre_fuera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primer_apellido_fuera_matri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido_fuera_matri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'hijos',
    timestamps: true,
  }
);

// Relaciones
// Hijo.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Hijo.belongsTo(Matrimonio, {
//   foreignKey: 'matrimonioId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Hijo.belongsTo(Matrimonio, {
//   foreignKey: 'matrimonioId',
//   as: 'matrimonio',
// });

export default Hijo;
