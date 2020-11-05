'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    userId: DataTypes.STRING,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    tableName : 'tokens'
  });
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};