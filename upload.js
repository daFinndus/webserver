const express = require('express');
const mysql = require('mysql');
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

const options = {
    key: fs.readFileSync('ssl/server.key'), cert: fs.readFileSync('ssl/server.crt')
};

// Allow cross-origin requests
app.use(cors());

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'webserver',
});

// Request dbName query to create a new table in the database
app.get('/upload', (req, res) => {
    const name = req.query.name;
    const email = req.query.email;

    const tableQuery = 'CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), email VARCHAR(255))';
    const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';


    // Create a new user table if it does not exist
    connection.query(tableQuery, (error) => {
        if (error) {
            console.error('Error creating table:', error);
            res.status(500).send('Error creating table');
        }
    });

    // Insert the new table into the database using prepared statements
    connection.query(insertQuery, [name, email], (error, results) => {
        if (error) {
            console.error('Error whilst loading:', error);
            console.error('Got following results:', results);
            res.status(500).send('Error inserting into database');
            return;
        }
        // Send an OK response if the query was successful
        res.send('Successfully uploaded data into database');

        // Save our uploaded data in data.txt - creating it, if it does not exist
        fs.appendFile('data.txt', `Name: ${name}, Email: ${email}\n`, (error) => {
            if (error) {
                console.error('Error writing to file:', error);
                return;
            }
            console.log('Successfully wrote to file');
        });
    });
});

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
