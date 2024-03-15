const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webserver',
});

app.get('/upload', (req, res) => {
    const dbName = req.query.dbName;
    
    const sql = `CREATE TABLE ${dbName}
                 (
                     name    VARCHAR(255),
                     address VARCHAR(255)
                 )`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error whilst loading:', error);
            console.error('Got following results:', results);
            res.status(500).send('Error inserting into database.');
            return;
        }
        res.send('Successfully created new entry in database.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
