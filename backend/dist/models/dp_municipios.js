"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_municipios = void 0;
const sequelize_1 = require("sequelize");
class dp_municipios extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_municipios.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            estado: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                references: {
                    model: 'dp_estados',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'dp_municipios',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
                {
                    name: "index_estado",
                    using: "BTREE",
                    fields: [
                        { name: "estado" },
                    ]
                },
            ]
        });
    }
}
exports.dp_municipios = dp_municipios;
