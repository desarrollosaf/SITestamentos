"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitud = void 0;
const sequelize_1 = require("sequelize");
const testamentosConnection_1 = __importDefault(require("../database/testamentosConnection")); // Ajusta la ruta según tu proyecto
const testigos_1 = __importDefault(require("./testigos"));
const albaceas_1 = __importDefault(require("./albaceas"));
const documentos_1 = __importDefault(require("./documentos"));
const herederos_1 = __importDefault(require("./herederos"));
const herederos_sustitutos_1 = __importDefault(require("./herederos_sustitutos"));
const hijos_1 = __importDefault(require("./hijos"));
const matrimonios_1 = __importDefault(require("./matrimonios"));
const padres_1 = __importDefault(require("./padres"));
const testamentos_pasados_1 = __importDefault(require("./testamentos_pasados"));
const tutor_descendientes_1 = __importDefault(require("./tutor_descendientes"));
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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    sabe_leer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    sabe_escribir: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    puede_hablar: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    puede_ver: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    puede_oir: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    dificultad_comunicacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    no_pasaporte: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cedula_profesional: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    documento_residencia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    heredero_menor_edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    documento_identifica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_documento_identifica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    indique_nacionalidad_serv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lugar_nacimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estatus_solicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
// Solicitud.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
Solicitud.hasMany(testigos_1.default, {
    foreignKey: 'solicitudId',
    as: 'testigos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasOne(albaceas_1.default, {
    foreignKey: 'solicitudId',
    as: 'albacea',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(documentos_1.default, {
    foreignKey: 'solicitudId',
    as: 'documentos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(herederos_1.default, {
    foreignKey: 'solicitudId',
    as: 'herederos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(herederos_sustitutos_1.default, {
    foreignKey: 'solicitudId',
    as: 'herederos_susti',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(hijos_1.default, {
    foreignKey: 'solicitudId',
    as: 'hijos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(matrimonios_1.default, {
    foreignKey: 'solicitudId',
    as: 'matrimonios',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(padres_1.default, {
    foreignKey: 'solicitudId',
    as: 'padres',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasOne(testamentos_pasados_1.default, {
    foreignKey: 'solicitudId',
    as: 'testamentos_pasados',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasOne(tutor_descendientes_1.default, {
    foreignKey: 'solicitudId',
    as: 'tutor_descendientes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Solicitud.hasMany(matrimonios_1.default, {
    foreignKey: 'solicitudId',
    as: 'primeras_nupcias',
});
Solicitud.hasMany(matrimonios_1.default, {
    foreignKey: 'solicitudId',
    as: 'segundas_nupcias',
});
Solicitud.hasMany(hijos_1.default, {
    foreignKey: 'solicitudId',
    as: 'hijo_fuera',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Solicitud;
