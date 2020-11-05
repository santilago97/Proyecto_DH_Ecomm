'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {

    return queryInterface.createTable('products', {

      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Image: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      Price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      idCategory: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
    
  },

  down:  (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('products');
   
  }
};
