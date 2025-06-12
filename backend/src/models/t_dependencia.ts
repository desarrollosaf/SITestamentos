import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/connection';

class Dependencia extends Model<
  InferAttributes<Dependencia>,
  InferCreationAttributes<Dependencia>
> {
  declare id_Dependencia: number;
  declare C_presupDep: number;
  declare Nombre: string;
  declare Creado: number;
  declare F_Creacion: string;
  declare U_Modificacion: string | null;
  declare Estado: number;
  declare orden: number | null;
  declare nombre_completo: string | null;
}

Dependencia.init(
  {
    id_Dependencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    C_presupDep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Creado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    F_Creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    
    U_Modificacion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
      
    },
    nombre_completo: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 't_dependencia',
    timestamps: false,
  }
);

export default Dependencia;
