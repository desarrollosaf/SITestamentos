"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dp_beneficiarios = void 0;
const sequelize_1 = require("sequelize");
class dp_beneficiarios extends sequelize_1.Model {
    static initModel(sequelize) {
        return dp_beneficiarios.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            nom_ben: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            pa_ben: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            sa_ben: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            porcentaje: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            f_rfc: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'dp_beneficiarios',
            timestamps: true,
            paranoid: true,
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
exports.dp_beneficiarios = dp_beneficiarios;
