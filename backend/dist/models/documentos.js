"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection"));
const solicitud_1 = __importDefault(require("./solicitud"));
const tipos_documentos_1 = __importDefault(require("./tipos_documentos"));
class Documento extends sequelize_1.Model {
}
Documento.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    solicitudId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    tipo_documento: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    archivo_path: {
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
    tableName: 'documentos',
    timestamps: true,
});
// Relaciones
Documento.belongsTo(solicitud_1.default, {
    foreignKey: 'solicitudId',
    as: 'solicitud',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Documento.belongsTo(tipos_documentos_1.default, {
    foreignKey: 'tipo_documento',
    as: 'tipo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Documento;
