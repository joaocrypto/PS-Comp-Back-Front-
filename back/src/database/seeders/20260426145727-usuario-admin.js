'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const password_hash = await bcryptjs.hash('admin123', 8);

    await queryInterface.bulkInsert('usuarios', [{
      user: 'Administrador',
      email: 'admin@cinerate.com',
      password_hash: password_hash,
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', { email: 'admin@cinerate.com' }, {});
  }
};
