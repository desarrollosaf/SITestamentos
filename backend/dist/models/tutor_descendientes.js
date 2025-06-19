"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
class TutorDescendiente extends sequelize_1.Model {
}
TutorDescendiente.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_tutor_sustituto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_curador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_curador_falta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    tableName: 'tutor_descendientes',
    timestamps: true,
});
// Relaciones
TutorDescendiente.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    as: 'solicitud',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = TutorDescendiente;
