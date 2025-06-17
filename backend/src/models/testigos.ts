import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import sequelizefun from '../database/testamentosConnection';
import Solicitud from './solicitud';

class Testigo extends Model<
  InferAttributes<Testigo>,
  InferCreationAttributes<Testigo>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare nombre: string |null;
  declare rfc: string | null;
  declare identificacion: string | null;
  declare curp: string | null;
  declare comprobante_domicilio: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare solicitud?: NonAttribute<Solicitud>;
}

Testigo.init(
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comprobante_domicilio: {
      type: DataTypes.STRING,
      allowNull: true,
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
    sequelize: sequelizefun,
    tableName: 'testigos',
    timestamps: true,
    paranoid: false,
    underscored: false,
  }
);

// Asociación con solicitud
// Testigo.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default Testigo;
