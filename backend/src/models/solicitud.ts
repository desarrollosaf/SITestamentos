import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';

import sequelize from '../database/testamentosConnection';
import User from './user';
import Testigo from './testigos';

class Solicitud extends Model<
  InferAttributes<Solicitud>,
  InferCreationAttributes<Solicitud>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare lugar_nacimiento: string | null;
  declare acta_nacimiento: string | null ;
  declare acta_matrimonio: string | null;
  declare identificacion: string | null;
  declare curp: string | null;
  declare comprobante_domicilio: string| null;
  declare certificado_privado: string | null;
  declare certificado_publico: string | null;
  declare fecha_envio: Date;

  declare user?: User;
  declare testigos?: Testigo[];

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

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
    sequelize,
    tableName: 'solicituds',
    timestamps: true,
    paranoid: true,
  }
);

// Relaciones
Solicitud.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Testigo, {
  foreignKey: 'solicitudId',
  as: 'testigos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


export default Solicitud;
