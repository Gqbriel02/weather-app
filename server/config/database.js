// config/database.js
const Sequelize = require('sequelize');

// MySQL database configuration
const dbConfig = {
    user: 'admin',
    password: 'admin',
    database: 'weatherapp',
};

module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: '172.29.176.1',
  dialect: 'mysql',
});
