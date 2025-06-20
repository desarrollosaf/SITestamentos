"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
class HerederoSustituto extends sequelize_1.Model {
}
HerederoSustituto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    nombre_sustituto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    primer_apellido_sustituto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    segundo_apellido_sustituto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre_a_sustituir: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    primer_apellido_a_sustituir: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    segundo_apellido_a_sustituir: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    derecho_acrecer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'herederos_sustitutos',
    timestamps: true,
});
// Relación con Solicitud
HerederoSustituto.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = HerederoSustituto;
