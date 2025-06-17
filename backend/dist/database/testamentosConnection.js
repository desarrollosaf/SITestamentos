"use strict";
// import { Sequelize } from "sequelize"
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelizeTestamentos = new Sequelize('testamentos', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     define: {
//         freezeTableName: true 
//     }
// })
// export default sequelizeTestamentos 
const sequelize_1 = require("sequelize");
const sequelizeTestamentos = new sequelize_1.Sequelize('adminplem_testamentos', 'usr_testamentos', '8lv8EXLKNvCovs2tx4MF', {
    host: '192.168.36.53',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});
exports.default = sequelizeTestamentos;
