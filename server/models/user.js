'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    line_user_id: DataTypes.STRING,
    follow: DataTypes.BOOLEAN,
    cookies: DataTypes.TEXT
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.reminder, {
      foreignKey: 'user_id',
      as: 'reminders',
      onDelete: 'CASCADE'
    })
  };
  return user;
};