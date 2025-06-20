"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
class Padre extends sequelize_1.Model {
}
Padre.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vive: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    especifique_nacionalidad: {
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
// Padre.belongsTo(Solicitud, {
//   foreignKey: 'solicitudId',
//   as: 'solicitud',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
exports.default = Padre;
