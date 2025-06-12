"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_tipo_permisos = void 0;
const sequelize_1 = require("sequelize");
class per_tipo_permisos extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_tipo_permisos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            permiso: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            antiguedad: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            indicativo: {
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
            tableName: 'per_tipo_permisos',
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
exports.per_tipo_permisos = per_tipo_permisos;
