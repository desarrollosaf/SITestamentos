"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
class Padre extends sequelize_1.Model {
}
Padre.init({
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
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'padres',
    timestamps: false, // Solo tienes `updatedAt` en la migración, no `createdAt`
});
// Relaciones
Padre.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    as: 'solicitud',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Padre;
