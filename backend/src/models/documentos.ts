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
import TipoDocumento from './tipos_documentos';

class Documento extends Model<
  InferAttributes<Documento>,
  InferCreationAttributes<Documento>
> {
  declare id: CreationOptional<string>;
  declare solicitudId: ForeignKey<string>;
  declare tipo_documento: ForeignKey<string>;
  declare archivo_path: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Documento.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    solicitudId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    archivo_path: {
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
    tableName: 'documentos',
    timestamps: true,
  }
);

// Relaciones
Documento.belongsTo(Solicitud, {
  foreignKey: 'solicitudId',
  as: 'solicitud',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Documento.belongsTo(TipoDocumento, {
  foreignKey: 'tipo_documento',
  as: 'tipo',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Documento;
