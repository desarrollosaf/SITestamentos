"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_estado_civil = void 0;
const sequelize_1 = require("sequelize");
class dp_estado_civil extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_estado_civil.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            estado_civil: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'dp_estado_civil',
            timestamps: true,
            paranoid: true,
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
exports.dp_estado_civil = dp_estado_civil;
