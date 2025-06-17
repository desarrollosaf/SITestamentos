"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const user_1 = __importDefault(require("./user"));
const testigos_1 = __importDefault(require("./testigos"));
class Solicitud extends sequelize_1.Model {
}
Solicitud.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    lugar_nacimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    acta_nacimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    acta_matrimonio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    identificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    curp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    comprobante_domicilio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    certificado_privado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    certificado_publico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_envio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'solicituds',
    timestamps: true,
    paranoid: true,
});
// Relaciones
Solicitud.belongsTo(user_1.default, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(testigos_1.default, {
    foreignKey: 'solicitudId',
    as: 'testigos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Solicitud;
