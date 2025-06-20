import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/testamentosConnection'; // Ajusta la ruta según tu proyecto
import User from './user';
import Testigo from './testigos';

export class Solicitud extends Model<
  InferAttributes<Solicitud>,
  InferCreationAttributes<Solicitud>
> {
  declare id: CreationOptional<string>;
  declare userId: string | null;
  declare nacionalidad: string | null;
  declare es_primer_testamento: boolean | null;
  declare sabe_leer: boolean | null; 
  declare sabe_escribir: boolean | null;
  declare puede_hablar: boolean | null;
  declare puede_ver: boolean | null;
  declare puede_oir: boolean | null;
  declare primer_testamento: boolean | null;
  declare dificultad_comunicacion: boolean | null;
  declare no_pasaporte: string | null;
  declare cedula_profesional: string | null;
  declare documento_residencia: boolean | null;
  declare heredero_menor_edad: boolean | null;
  declare documento_identifica: string | null;
  declare numero_documento_identifica: string | null; 
  declare indique_nacionalidad_serv: string | null;
  declare user?: User;
  declare testigos?: Testigo[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

Solicitud.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    es_primer_testamento: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sabe_leer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sabe_escribir: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    puede_hablar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    puede_ver: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    puede_oir: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },   
    primer_testamento: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }, 
    dificultad_comunicacion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    no_pasaporte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cedula_profesional: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documento_residencia: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    heredero_menor_edad: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
     documento_identifica: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero_documento_identifica: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indique_nacionalidad_serv: {
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'solicituds',
    timestamps: true,
    paranoid: true,
  }
);

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
