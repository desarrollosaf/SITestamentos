"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_calentarios = void 0;
const sequelize_1 = require("sequelize");
class per_calentarios extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_calentarios.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            suspencion_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            fecha: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            fecha_inicial: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            fecha_final: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            identificador: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            observaciones: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            tipo_registro_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            dependencia_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            direccion_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            departamento_id: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'per_calentarios',
            timestamps: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.per_calentarios = per_calentarios;
