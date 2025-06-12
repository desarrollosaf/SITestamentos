"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_estados = void 0;
const sequelize_1 = require("sequelize");
class dp_estados extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_estados.init({
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
            pais: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                references: {
                    model: 'dp_paises',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'dp_estados',
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
                    name: "index_pais",
                    using: "BTREE",
                    fields: [
                        { name: "pais" },
                    ]
                },
            ]
        });
    }
}
exports.dp_estados = dp_estados;
