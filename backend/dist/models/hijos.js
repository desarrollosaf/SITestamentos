"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
const matrimonios_1 = __importDefault(require("./matrimonios"));
class Hijos extends sequelize_1.Model {
}
Hijos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    matrimonioId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reconocido: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    fuera_de_matrimonio: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'hijos',
    timestamps: true,
    indexes: [
        {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: ['id'],
        },
    ],
});
// Relaciones
Hijos.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    as: 'solicitud',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Hijos.belongsTo(matrimonios_1.default, {
    foreignKey: 'matrimonioId',
    as: 'matrimonio',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Hijos;
