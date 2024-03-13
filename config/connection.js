require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(error => {
  if (error) {
    return console.error('error: ' + error.message);
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;
