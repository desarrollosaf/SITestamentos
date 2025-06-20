'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('herederos_sustitutos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      nombre_sustituto: {
        type: Sequelize.STRING
      },
      primer_apellido_sustituto: {
        type: Sequelize.STRING
      },
      segundo_apellido_sustituto: {
        type: Sequelize.STRING
      },
      nombre_a_sustituir: {
        type: Sequelize.STRING
      },
      primer_apellido_a_sustituir: {
        type: Sequelize.STRING
      },
      segundo_apellido_a_sustituir: {
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
    await queryInterface.dropTable('herederos_sustitutos');
  }
};