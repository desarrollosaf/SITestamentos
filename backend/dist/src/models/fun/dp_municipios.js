"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_municipios = void 0;
const sequelize_1 = require("sequelize");
class dp_municipios extends sequelize_1.Model {
    static initModel(sequelize) {
        dp_municipios.init({
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
            estado: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            tableName: 'dp_municipios',
            timestamps: false,
            indexes: [
                { name: 'PRIMARY', unique: true, fields: ['id'] },
                { name: 'index_estado', fields: ['estado'] },
            ],
        });
        return dp_municipios;
    }
    static associate(models) {
        dp_municipios.belongsTo(models.dp_estados, {
            foreignKey: 'estado',
            as: 'estado_dp_estado',
        });
        dp_municipios.hasMany(models.dp_colonias, {
            foreignKey: 'municipio',
            as: 'dp_colonia',
        });
        dp_municipios.hasMany(models.dp_datospersonales, {
            foreignKey: 'municipio_id',
            as: 'dp_datospersonales',
        });
    }
}
exports.dp_municipios = dp_municipios;
