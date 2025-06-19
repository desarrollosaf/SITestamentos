'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hijos', {
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
      matrimonioId: {
        type: Sequelize.UUID,
        references: {
          model: 'matrimonios',
          key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      vive: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reconocido: {
        type: Sequelize.BOOLEAN
      },
      fuera_de_matrimonio: {
        type: Sequelize.BOOLEAN
      },
      nombre_fuera: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('hijos');
  }
};