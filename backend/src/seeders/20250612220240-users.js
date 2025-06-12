'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', 10);

    const users = [
      { id: uuidv4(), name: 'SAGM990220', email: 'martin.sanchez@congresoedomex.gob.mx', password: hashedPassword },
      { id: uuidv4(), name: 'JISP980721', email: 'pablo.jimenez@congresoedomex.gob.mx', password: hashedPassword },
      { id: uuidv4(), name: 'DEGC941209', email: 'cesar.desales@congresoedomex.gob.mx', password: hashedPassword },
    ];

    await queryInterface.bulkInsert(
      'users',
      users.map(user => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );

    await queryInterface.bulkInsert(
      'rol_users',
      users.map(user => ({
        user_id: user.id,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol_users', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
