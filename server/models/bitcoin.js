'use strict';
module.exports = (sequelize, DataTypes) => {
  const bitcoin = sequelize.define('bitcoin', {
    bitcoin_code: DataTypes.STRING,
    bitcoin_name: DataTypes.STRING
  }, {});
  bitcoin.associate = function(models) {
    // associations can be defined here
    bitcoin.hasMany(models.reminder, {
      foreignKey: 'bitcoin_id'
    })
  };
  return bitcoin;
};