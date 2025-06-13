import { Sequelize } from "sequelize"

const sequelizeTestamentos = new Sequelize('testamentos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true 
    }
})

export default sequelizeTestamentos 
