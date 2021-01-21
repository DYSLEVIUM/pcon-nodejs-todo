require('dotenv').config();

const mysql = require('mysql');

const tableName = process.env.DB_TABLE_NAME;

//  database connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const createTable = async () => {
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (publicId VARCHAR(50) NOT NULL, noteId INTEGER AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50) NOT NULL, description VARCHAR(255));`;
  await pool.query(sql, (err, result) => {
    if (!err) console.log('Created notes table');
    else console.log(err);
  }); //  making the users table if it does not exist
};

const addNote = async ({ publicId, title, description }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO ${tableName} (publicId, title, description) VALUES (?,?,?)`;

    pool.query(sql, [publicId, title, description], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getNotes = async () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${tableName}`;

    pool.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getNote = async (noteId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${tableName} WHERE noteId=?`;

    pool.query(sql, [noteId], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const updateNote = async ({ publicId, title, description, noteId }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${tableName} SET publicId=?, title=?, description=? WHERE noteId=?`;

    pool.query(sql, [publicId, title, description, noteId], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const deleteNote = async (noteId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM ${tableName} WHERE noteId=?`;

    pool.query(sql, [noteId], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = {
  createTable,
  addNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
