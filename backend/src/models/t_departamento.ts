import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/connection';

class Departamento extends Model<
  InferAttributes<Departamento>,
  InferCreationAttributes<Departamento>
> {
  declare id_Departamento: CreationOptional<number>;
  declare C_presupDepto: number;
  declare Nombre: string;
  declare Creado: number;
  declare F_Creacion: string;
  declare U_Modificacion: string;
  declare Estado: number;
  declare id_Dependencia: number | null;
  declare id_Direccion: number | null;
  declare c_presup: number;
  declare nombre_completo: string | null;
  declare nom_cap: string | null;
}


Departamento.init(
  {
    id_Departamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    C_presupDepto: {
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
      allowNull: false,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Dependencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_Direccion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_presup: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_completo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nom_cap: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 't_departamento',
    timestamps: false,
    indexes: [
      {
        name: 'id_Departamento',
        using: 'BTREE',
        fields: [{ name: 'id_Departamento' }],
      },
    ],
  }
);


export default Departamento;
