const mysql = require('mysql');

// MySQL database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weatherapp',
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL')
});

module.exports = connection;