require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

//  middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

//  database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const tableName = 'notes';

//  iife to create table
(async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS ${tableName} (publicId VARCHAR(50) NOT NULL, noteId INTEGER AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50) NOT NULL, description VARCHAR(255));`,
    (err, result) => {
      if (!err) console.log('Created notes table');
      else console.log(err);
    }
  ); //  making the users table if it does not exist
})();

// endpoints;
//  create
app.put('/addNote', (req, res) => {
  let sql = `INSERT INTO ${tableName} (publicId, title, description) VALUES ('${req.body.publicId}','${req.body.title}','${req.body.description}')`;

  pool.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//  read
app.get('/getNotes', (req, res) => {
  let sql = `SELECT * FROM ${tableName}`;

  pool.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get('/getNote/:noteId', (req, res) => {
  let sql = `SELECT * FROM ${tableName} WHERE noteId=${req.params.noteId}`;

  pool.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//  update
app.patch('/updateNote', (req, res) => {
  let sql = `UPDATE ${tableName} SET publicId='${req.body.publicId}', title='${req.body.title}', description='${req.body.description}' WHERE noteId=${req.body.noteId}`;

  pool.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//  delete
app.delete('/deleteNote/:noteId', (req, res) => {
  let sql = `DELETE FROM ${tableName} WHERE noteId=${req.params.noteId}`;

  pool.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//  all other endpoints go to react
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
