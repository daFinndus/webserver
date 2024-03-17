const express = require('express');
const mysql = require('mysql');
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

// Allow cross-origin requests
app.use(cors());

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webserver',
});

// Request dbName query to create a new table in the database
app.get('/upload', (req, res) => {
    const name = req.query.name;
    const email = req.query.email;

    const table = 'CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), address VARCHAR(255))';

    // This is our SQL query
    const data = `INSERT INTO users (name, email)
                  VALUES ('${name}', '${email}')`;

    // Create a new user table if it does not exist
    connection.query(table);

    // Insert the new table into the database
    connection.query(data, (error, results) => {
        if (error) {
            console.error('Error whilst loading:', error);
            console.error('Got following results:', results);
            res.status(500).send('Error inserting into database');
            return;
        }
        // Send an OK response if the query was successful
        res.send('Successfully uploaded data into database');
    });
});

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
