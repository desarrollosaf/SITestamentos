'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('albaceas', {
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
      nombre_albacea: {
        type: Sequelize.STRING,
        allowNull: false
      },
       primer_apellido_albacea: {
        type: Sequelize.STRING,
        allowNull: false
      },
       segundo_apellido_albacea: {
        type: Sequelize.STRING,
        allowNull: false
      },
       nombre_falta_albacea: {
        type: Sequelize.STRING,
        allowNull: false
      },
       primer_apellido_falta_albacea: {
        type: Sequelize.STRING,
        allowNull: false
      },
       segundo_apellido_falta_albacea: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('albaceas');
  }
};