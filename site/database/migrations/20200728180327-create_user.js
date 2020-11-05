'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {

      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      Apellido: {
        type: Sequelize.STRING(30),
        allowNull: false
      }, 
      Email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      Avatar: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      idRol: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
    
  },

  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('users');
   
  }
};
