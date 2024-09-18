const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');

const Payment = sequelize.define('Payment', {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Payment;
