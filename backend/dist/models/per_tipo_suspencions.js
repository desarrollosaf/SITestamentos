"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_tipo_suspencions = void 0;
const sequelize_1 = require("sequelize");
class per_tipo_suspencions extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_tipo_suspencions.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            tipo: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'per_tipo_suspencions',
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
exports.per_tipo_suspencions = per_tipo_suspencions;
