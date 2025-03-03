const mariadb = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.DB_PASSWORD;

const db = mariadb.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password,
    database: 'NoteApp'
  }
);

db.connect((err) => {
  if (err) {
    console.log('DB 연결 실패');
  } else {
    console.log('DB 연결 성공');
  }
});

module.exports = db;
