'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('estado_civils', [
      { id: uuidv4(), nombre: 'Soltero/a', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Casado/a', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Concubinato', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Separado/a', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Divorciado/a', createdAt: new Date(), updatedAt: new Date()},
      { id: uuidv4(), nombre: 'Viudo/a', createdAt: new Date(), updatedAt: new Date()},
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estado_civils', null, {});
  }
};
