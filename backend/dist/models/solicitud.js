"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitud = void 0;
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection")); // Ajusta la ruta según tu proyecto
const user_1 = __importDefault(require("./user"));
const testigos_1 = __importDefault(require("./testigos"));
class Solicitud extends sequelize_1.Model {
}
exports.Solicitud = Solicitud;
Solicitud.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    es_primer_testamento: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    sabe_leer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    sabe_escribir: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    puede_hablar: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    puede_ver: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    puede_oir: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    dificultad_comunicacion: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    no_pasaporte: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    cedula_profesional: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    documento_residencia: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    heredero_menor_edad: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: testamentosConnection_1.default,
    tableName: 'solicituds',
    timestamps: true,
    paranoid: true,
});
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
