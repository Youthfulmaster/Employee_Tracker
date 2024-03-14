const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Load and use environment variables from a .env file if you decide to use one
require('dotenv').config();

// Configuration for your database
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'employeetracker_db',
    port: process.env.DB_PORT || 5432,
};

// Create a connection pool to the database
const pool = new Pool(dbConfig);

// Connect to the database
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err);
        return;
    }
    console.log('Successfully connected to the PostgreSQL database.');
    // Optional: call a function here to create tables if they don't exist
    // initializeDatabase(client);
});


// Export the pool to use in other modules
module.exports = pool;
