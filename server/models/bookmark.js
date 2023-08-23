// models/Bookmark.js
const db = require('../config/database');

const Bookmark = db.define('bookmark', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  user_id: { // New column for user reference
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Bookmark;
