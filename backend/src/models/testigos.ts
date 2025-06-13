import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from 'sequelize';
import sequelizefun from '../database/testamentosConnection';
import { Solicitud } from './solicitud';

export class Testigo extends Model<
  InferAttributes<Testigo>,
  InferCreationAttributes<Testigo>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare nombre: string;
  declare rfc?: string;
  declare identificacion?: string;
  declare curp?: string;
  declare comprobante_domicilio?: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Asociación
  declare solicitud?: NonAttribute<Solicitud>;

  static initModel(sequelize: Sequelize): typeof Testigo {
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
          allowNull: false,
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

     Testigo.belongsTo(Solicitud, {
      foreignKey: 'solicitudId',
      as: 'solicitud',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    return Testigo;
  }
}
