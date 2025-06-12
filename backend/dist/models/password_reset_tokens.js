"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.password_reset_tokens = void 0;
const sequelize_1 = require("sequelize");
class password_reset_tokens extends sequelize_1.Model {
    static initModel(sequelize) {
        return password_reset_tokens.init({
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            },
            token: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'password_reset_tokens',
            timestamps: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "email" },
                    ]
                },
            ]
        });
    }
}
exports.password_reset_tokens = password_reset_tokens;
