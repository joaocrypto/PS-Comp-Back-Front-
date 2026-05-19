module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      comentario: {
        type: Sequelize.STRING,
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      filme_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filmes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      uniqueKeys: {
        actions_unique: {
          fields: ['usuario_id', 'filme_id']
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('avaliacoes');
  }
};
