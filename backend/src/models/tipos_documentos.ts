import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/testamentosConnection';
import Documento from './documentos';

class TipoDocumento extends Model<
  InferAttributes<TipoDocumento>,
  InferCreationAttributes<TipoDocumento>
> {
  declare id: CreationOptional<string>;
  declare tipo: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TipoDocumento.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tipo: {
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
    tableName: 'tipos_documentos',
    timestamps: true,
  }
);

// Relación inversa
TipoDocumento.hasMany(Documento, {
  foreignKey: 'tipo_documento',
  as: 'documentos',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default TipoDocumento;
