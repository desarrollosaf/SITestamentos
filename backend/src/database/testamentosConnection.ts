import { Sequelize } from "sequelize"

const sequelizeTestamentos = new Sequelize('testamentos', 'homestead', 'secret', {
    host: '192.168.10.10',
    dialect: 'mysql',
    define: {
        freezeTableName: true 
    }
})

export default sequelizeTestamentos 
