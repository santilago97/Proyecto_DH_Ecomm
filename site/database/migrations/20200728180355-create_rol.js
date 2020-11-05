'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {

    return queryInterface.createTable('roles', {

      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Description: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    })
    
  },

  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('roles');
   
  }
};
