// models/User.js
const db = require('../config/database');

const User = db.define('user', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
