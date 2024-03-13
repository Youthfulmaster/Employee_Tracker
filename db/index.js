const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

// Load and use environment variables from a .env file if you decide to use one
require('dotenv').config();

// Configuration for your database
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'company_db',
    multipleStatements: true // Allows for multiple statements in one query if needed
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    // Optional: call a function here to create tables if they don't exist
    // initializeDatabase();
});

// Optional: Function to initialize database with schema.sql
function initializeDatabase() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

    connection.query(schemaSQL, (error, results, fields) => {
        if (error) throw error;
        console.log("Database has been initialized with the schema.");
    });
}

// Export the connection to use in other modules
module.exports = connection;
