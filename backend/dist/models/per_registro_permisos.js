"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.per_registro_permisos = void 0;
const sequelize_1 = require("sequelize");
class per_registro_permisos extends sequelize_1.Model {
    static initModel(sequelize) {
        return per_registro_permisos.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            tramite_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            fecha_aclaratoria: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            omision_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            fecha_inicial: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            fecha_final: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            licencia_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            evidencia_file: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            papeleta_path: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            papeleta_uuid: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            observaciones: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            rfc_usuario: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            validacionJfe: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            fecha_validacion_jfe: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            rfc_jfe: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            validacionUni: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            fecha_validacion_uni: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            statusPermiso: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            fecha_validacion_personal: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            visto_jfe: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            visto_unidad: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            },
            visto_personal: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0
            }
        }, {
            sequelize,
            tableName: 'per_registro_permisos',
            timestamps: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.per_registro_permisos = per_registro_permisos;
