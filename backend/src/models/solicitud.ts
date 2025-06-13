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
import User from './user';

export class Solicitud extends Model<
  InferAttributes<Solicitud>,
  InferCreationAttributes<Solicitud>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare lugar_nacimiento: string;
  declare acta_nacimiento: string;
  declare acta_matrimonio?: string;
  declare identificacion: string;
  declare curp: string;
  declare comprobante_domicilio: string;
  declare certificado_privado?: string;
  declare certificado_publico?: string;
  declare fecha_envio: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  // Asociación con User
  declare user?: NonAttribute<User>;

  static initModel(sequelize: Sequelize): typeof Solicitud {
    Solicitud.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        lugar_nacimiento: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        acta_nacimiento: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        acta_matrimonio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        identificacion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        curp: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comprobante_domicilio: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        certificado_privado: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        certificado_publico: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        fecha_envio: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        sequelize: sequelizefun, // conexión específica
        tableName: 'solicituds',
        timestamps: true,
        paranoid: true,
        underscored: false,
      }
    );

    Solicitud.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    return Solicitud;
  }
}
