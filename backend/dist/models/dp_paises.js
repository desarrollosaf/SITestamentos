"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_paises = void 0;
const sequelize_1 = require("sequelize");
class dp_paises extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_paises.init({
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
            }
        }, {
            sequelize,
            tableName: 'dp_paises',
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
            ]
        });
    }
}
exports.dp_paises = dp_paises;
