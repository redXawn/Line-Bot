'use strict';
module.exports = (sequelize, DataTypes) => {
  const reminder = sequelize.define('reminder', {
    user_id: DataTypes.INTEGER,
    bitcoin_id: DataTypes.INTEGER,
    last_price: DataTypes.INTEGER,
    reminder_price: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  reminder.associate = function(models) {
    // associations can be defined here
    reminder.belongsTo(models.user, {
      foreignKey: 'user_id', 
      as: 'user', 
      onDelete: 'CASCADE' 
    }),
    reminder.belongsTo(models.bitcoin, {
      foreignKey: 'bitcoin_id', 
      as: 'bitcoin'
    })
  };
  return reminder;
};