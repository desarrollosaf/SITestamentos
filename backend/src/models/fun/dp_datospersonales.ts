import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from 'sequelize';
import sequelizefun from '../../database/fun'; // Conexión específica a 'administracion'
import { dp_colonias } from '../fun/dp_colonias';
import { dp_escolaridad } from '../fun/dp_escolaridad';
import  dp_estado_civil  from '../fun/dp_estado_civil';
import { dp_estados } from '../fun/dp_estados';
import { dp_municipios } from '../fun/dp_municipios';
import { dp_opciones } from '../fun/dp_opciones';

export class dp_datospersonales extends Model<
  InferAttributes<dp_datospersonales>,
  InferCreationAttributes<dp_datospersonales>
> {
  declare id: CreationOptional<number>;
  declare f_nombre: string;
  declare f_primer_apellido: string;
  declare f_segundo_apellido?: string;
  declare f_curp: string;
  declare f_rfc: string;
  declare f_homclave: string;
  declare f_sexo?: string;
  declare f_clave_issemym?: string;
  declare f_fecha_nacimiento: string;
  declare f_entidad?: string;
  declare f_domicilio?: string;
  declare f_colonia?: string;
  declare f_cedula?: string;
  declare f_cp?: string;
  declare f_cuenta_bancaria?: string;
  declare f_municipio?: string;
  declare numint?: string;
  declare numext?: string;
  declare correo_ins?: string;
  declare correo_per?: string;
  declare numero_tel?: string;
  declare numero_cel?: string;
  declare fecha_escolaridad?: string;
  declare area_escolaridad?: string;

  // Timestamps & Paranoid
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;

  // Foreign Keys
  declare estadocivil_id?: ForeignKey<number>;
  declare sindicalizado_id?: ForeignKey<number>;
  declare sci_id?: ForeignKey<number>;
  declare escolaridad_id?: ForeignKey<number>;
  declare estado_id?: ForeignKey<number>;
  declare municipio_id?: ForeignKey<number>;
  declare colonia_id?: ForeignKey<number>;

  // Associations
  declare estado?: NonAttribute<dp_estados>;
  declare municipio?: NonAttribute<dp_municipios>;
  declare colonia?: NonAttribute<dp_colonias>;
  declare escolaridad?: NonAttribute<dp_escolaridad>;
  declare estadocivil?: NonAttribute<dp_estado_civil>;
  declare sindicalizado?: NonAttribute<dp_opciones>;
  declare sci?: NonAttribute<dp_opciones>;

  static initModel(sequelize: Sequelize): typeof dp_datospersonales {
    dp_datospersonales.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        f_nombre: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_primer_apellido: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_segundo_apellido: DataTypes.STRING(255),
        f_curp: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_rfc: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_homclave: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_sexo: DataTypes.STRING(255),
        f_clave_issemym: DataTypes.STRING(255),
        f_fecha_nacimiento: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        f_entidad: DataTypes.STRING(255),
        f_domicilio: DataTypes.STRING(255),
        f_colonia: DataTypes.STRING(255),
        f_cedula: DataTypes.STRING(255),
        f_cp: DataTypes.STRING(255),
        f_cuenta_bancaria: DataTypes.STRING(255),
        f_municipio: DataTypes.STRING(255),
        numint: DataTypes.STRING(255),
        numext: DataTypes.STRING(255),
        correo_ins: DataTypes.STRING(255),
        correo_per: DataTypes.STRING(255),
        numero_tel: DataTypes.STRING(255),
        numero_cel: DataTypes.STRING(255),
        fecha_escolaridad: DataTypes.STRING(255),
        area_escolaridad: DataTypes.STRING(255),
        estadocivil_id: DataTypes.BIGINT.UNSIGNED,
        sindicalizado_id: DataTypes.BIGINT.UNSIGNED,
        sci_id: DataTypes.BIGINT.UNSIGNED,
        escolaridad_id: DataTypes.BIGINT.UNSIGNED,
        estado_id: DataTypes.BIGINT.UNSIGNED,
        municipio_id: DataTypes.BIGINT.UNSIGNED,
        colonia_id: DataTypes.BIGINT.UNSIGNED,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
      },
      {
        sequelize: sequelizefun, // conexión específica
        tableName: 'dp_datospersonales',
        timestamps: false,
        paranoid: true,
        underscored: true,
      }
    );

     dp_datospersonales.belongsTo(dp_colonias, {
      foreignKey: 'colonia_id',
      as: 'colonia',
    });

    //  dp_datospersonales.belongsTo(dp_escolaridad, {
    //   foreignKey: 'escolaridad_id',
    //   as: 'escolaridad',
    // });

    //  dp_datospersonales.belongsTo(dp_estado_civil, {
    //   foreignKey: 'estadocivil_id',
    //   as: 'estadocivil',
    // });

    //  dp_datospersonales.belongsTo(dp_estados, {
    //   foreignKey: 'estado_id',
    //   as: 'estado',
    // });

    //   dp_datospersonales.belongsTo(dp_municipios, {
    //   foreignKey: 'municipio_id',
    //   as: 'municipio',
    // });

    //  dp_datospersonales.belongsTo(dp_opciones, {
    //   foreignKey: 'sindicalizado_id',
    //   as: 'sindicalizado',
    // });

    // dp_datospersonales.belongsTo(dp_opciones, {
    //   foreignKey: 'sci_id',
    //   as: 'sci',
    // });

    return dp_datospersonales;
  }
}
