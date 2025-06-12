"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre_programatico_presupuestals = void 0;
const sequelize_1 = require("sequelize");
class pre_programatico_presupuestals extends sequelize_1.Model {
    static initModel(sequelize) {
        return pre_programatico_presupuestals.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pre_programatico_presupuestals',
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
exports.pre_programatico_presupuestals = pre_programatico_presupuestals;
