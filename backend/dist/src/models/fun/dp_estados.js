"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_estados = void 0;
const sequelize_1 = require("sequelize");
class dp_estados extends sequelize_1.Model {
    static initModel(sequelize) {
        dp_estados.init({
            id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: '',
            },
            pais: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            tableName: 'dp_estados',
            timestamps: false,
            indexes: [
                { name: 'PRIMARY', unique: true, fields: ['id'] },
                { name: 'index_pais', fields: ['pais'] },
            ],
        });
        return dp_estados;
    }
    static associate(models) {
        dp_estados.belongsTo(models.dp_paises, {
            foreignKey: 'pais',
            as: 'pais_dp_paise',
        });
        dp_estados.hasMany(models.dp_municipios, {
            foreignKey: 'estado',
            as: 'dp_municipios',
        });
        dp_estados.hasMany(models.dp_datospersonales, {
            foreignKey: 'estado_id',
            as: 'dp_datospersonales',
        });
    }
}
exports.dp_estados = dp_estados;
