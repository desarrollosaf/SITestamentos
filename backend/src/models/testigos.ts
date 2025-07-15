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

class Testigo extends Model<
  InferAttributes<Testigo>,
  InferCreationAttributes<Testigo>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<Solicitud['id']>;
  declare nombre_testigo: string | null;
  declare primer_apellido_testigo: string | null;
   declare segundo_apellido_testigo: string | null;
  declare nacionalidad: string | null;
  declare fecha_naciento: Date | null;
  declare lugar_nacimiento: string | null;
  declare curp_dato: string | null;
  declare estado_civil: string | null;
  declare ocupacion: string | null;
  declare domicilio: string | null;
  declare cp: string | null;
  declare telefono: string | null;
  declare rfc: string | null;
  declare identificacion: string | null;
  declare curp: string | null;
  declare comprobante_domicilio: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
    nombre_testigo
    : {
      type: DataTypes.STRING,
      allowNull: true,
    },
     primer_apellido_testigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     segundo_apellido_testigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_naciento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    lugar_nacimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    curp_dato: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_civil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ocupacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
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
    sequelize,
    tableName: 'testigos',
    timestamps: true,
  }
);

// Relación con Solicitud
// Testigo.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default Testigo;
