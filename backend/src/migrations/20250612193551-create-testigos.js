'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testigos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      solicitudId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'solicituds',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nacionalidad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_naciento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      lugar_nacimiento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      curp_dato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado_civil: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ocupacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      domicilio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rfc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      identificacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      curp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comprobante_domicilio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('testigos');
  }
};
