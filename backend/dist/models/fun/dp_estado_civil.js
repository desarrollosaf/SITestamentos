"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_estado_civil = void 0;
const sequelize_1 = require("sequelize");
const fun_1 = __importDefault(require("../../database/fun")); // Conexión específica a 'administracion'
class dp_estado_civil extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_estado_civil.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            estado_civil: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize: fun_1.default, // conexión específica
            tableName: 'dp_estado_civil',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        });
    }
}
exports.dp_estado_civil = dp_estado_civil;
