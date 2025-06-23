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
import Albacea from './albaceas';
import Documento from './documentos';
import Heredero from './herederos';
import HerederoSustituto from './herederos_sustitutos';
import Hijo from './hijos';
import Matrimonio from './matrimonios';
import Padre from './padres';
import TestamentoPasados from './testamentos_pasados';
import TutorDescendiente from './tutor_descendientes';

export class Solicitud extends Model<
  InferAttributes<Solicitud>,
  InferCreationAttributes<Solicitud>
> {
  declare id: CreationOptional<string>;
  declare userId: string | null;
  declare nacionalidad: string | null;
  declare es_primer_testamento: number | null;
  declare sabe_leer: number | null; 
  declare sabe_escribir: number | null;
  declare puede_hablar: number | null;
  declare puede_ver: number | null;
  declare puede_oir: number | null;
  declare dificultad_comunicacion: string | null;
  declare no_pasaporte: string | null;
  declare cedula_profesional: string | null;
  declare documento_residencia: number | null;
  declare heredero_menor_edad: number | null;
  declare documento_identifica: string | null;
  declare numero_documento_identifica: string | null; 
  declare indique_nacionalidad_serv: string | null;
  declare user?: User;
  declare datos_user?: any
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sabe_leer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sabe_escribir: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puede_hablar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puede_ver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    puede_oir: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },   
    dificultad_comunicacion: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    heredero_menor_edad: {
      type: DataTypes.INTEGER,
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

// Solicitud.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
Solicitud.hasMany(Testigo, {
  foreignKey: 'solicitudId',
  as: 'testigos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasOne(Albacea, {
  foreignKey: 'solicitudId',
  as: 'albacea',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Documento, {
  foreignKey: 'solicitudId',
  as: 'documentos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Heredero, {
  foreignKey: 'solicitudId',
  as: 'herederos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(HerederoSustituto, {
  foreignKey: 'solicitudId',
  as: 'herederos_susti',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Hijo, {
  foreignKey: 'solicitudId',
  as: 'hijos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Matrimonio, {
  foreignKey: 'solicitudId',
  as: 'matrimonios',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Padre, {     
  foreignKey: 'solicitudId',
  as: 'padres',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasOne(TestamentoPasados, {
  foreignKey: 'solicitudId',
  as: 'testamentos_pasados',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasOne(TutorDescendiente, {
  foreignKey: 'solicitudId',
  as: 'tutor_descendientes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Solicitud.hasMany(Matrimonio, {
  foreignKey: 'solicitudId',
  as: 'primeras_nupcias',
});

Solicitud.hasMany(Matrimonio, {
  foreignKey: 'solicitudId',
  as: 'segundas_nupcias',
});
Solicitud.hasMany(Hijo, {
  foreignKey: 'solicitudId',
  as: 'hijo_fuera',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


export default Solicitud;
