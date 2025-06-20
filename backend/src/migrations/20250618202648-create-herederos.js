'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('herederos', {
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      solicitudId: {
        type: Sequelize.UUID,
        references: {
          model: 'solicituds',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      nombre_heredero: {
        type: Sequelize.STRING
      },
      primer_apellido_heredero: {
        type: Sequelize.STRING
      },
      segundo_apellido_heredero: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      parentesco: {
        type: Sequelize.STRING
      },
      porcentaje: {
        type: Sequelize.STRING
      },
    
      derecho_acrecer: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('herederos');
  }
};