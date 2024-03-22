const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const https = require('https');
const fs = require('fs');
const form = multer();

const app = express();
const port = 3000;

// Options for our SSL-certificate
const options = {
    key: fs.readFileSync('ssl/server.key'), cert: fs.readFileSync('ssl/server.crt'),
};

// Serve the index.html file
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(form.array());
app.use(bodyParser.urlencoded({extended: true}));

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'webserver',
});

// Request dbName query to create a new table in the database
app.post('/upload', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    console.log("Got data from the form:", name, email);

    const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

    connection.query(insertQuery, [name, email], (error, results) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            res.status(500).send('Error inserting data into database');
            return;
        }
        res.send('Data uploaded successfully');
    });

    fs.appendFile('users.txt', `${name}, ${email}\n`, (error) => {
        if (error) {
            console.error('Error writing to file:', error);
            return;
        }
        console.log('Data written to file');
    });
});

// Create HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
