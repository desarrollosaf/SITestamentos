"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_types_1 = require("sequelize/types/data-types");
const citas_1 = require("./citas");
citas_1.Cita.init({
    id: {
        type: data_types_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    rfc: {
        type: data_types_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha: {
        type: data_types_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'citas',
    timestamps: true, // Sequelize generará y actualizará automáticamente createdAt y updatedAt
});
