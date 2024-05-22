'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AvailableHours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_hour: {
        type: Sequelize.STRING
      },
      end_hour: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'schema',
          },
          key: 'id',
        },
        allowNull: false,
      },
      workTypesId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'workTypes',
            schema: 'schema',
          },
          key: 'id',
        },
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
    await queryInterface.dropTable('AvailableHours');
  }
};