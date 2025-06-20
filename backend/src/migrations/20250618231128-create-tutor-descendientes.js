'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tutor_descendientes', {
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
      nombre_tutor: {
        type: Sequelize.STRING,
         allowNull: true,
      },
      primer_apellido_tutor: {
        type: Sequelize.STRING,
         allowNull: true,
      },
      segundo_apellido_tutor: {
        type: Sequelize.STRING,
         allowNull: true,
      },
      nombre_tutor_sustituto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primer_apellido_tutor_sustituto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_apellido_tutor_sustituto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombre_curador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primer_apellido_curador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_apellido_curador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nombre_a_su_falta_curador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primer_apellido_a_su_falta_curador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      segundo_apellido_a_su_falta_curador: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('tutor_descendientes');
  }
};