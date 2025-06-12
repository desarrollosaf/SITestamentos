"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.car_tipo_movimientos_personals = void 0;
const sequelize_1 = require("sequelize");
class car_tipo_movimientos_personals extends sequelize_1.Model {
    static initModel(sequelize) {
        return car_tipo_movimientos_personals.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            valor: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'car_tipo_movimientos_personals',
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
exports.car_tipo_movimientos_personals = car_tipo_movimientos_personals;
