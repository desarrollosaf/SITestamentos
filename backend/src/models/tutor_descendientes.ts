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

class TutorDescendiente extends Model<
  InferAttributes<TutorDescendiente>,
  InferCreationAttributes<TutorDescendiente>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare nombre_tutor: string | null;
  declare primer_apellido_tutor: string | null;
  declare segundo_apellido_tutor: string | null;
  declare nombre_tutor_sustituto: string | null;
  declare primer_apellido_tutor_sustituto: string | null;
  declare segundo_apellido_tutor_sustituto: string | null;
  declare nombre_curador: string | null;
  declare primer_apellido_curador: string | null;
  declare segundo_apellido_curador: string | null;
  declare nombre_a_su_falta_curador: string | null;
  declare primer_apellido_a_su_falta_curador: string | null;
  declare segundo_apellido_a_su_falta_curador: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TutorDescendiente.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre_tutor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido_tutor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_tutor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_tutor_sustituto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     primer_apellido_tutor_sustituto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_tutor_sustituto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_curador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     primer_apellido_curador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_curador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_a_su_falta_curador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primer_apellido_a_su_falta_curador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundo_apellido_a_su_falta_curador: {
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
    tableName: 'tutor_descendientes',
    timestamps: true,
  }
);

// Relaciones
// TutorDescendiente.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

export default TutorDescendiente;
