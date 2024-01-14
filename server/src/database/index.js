const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "urbanroost",
    port: process.env.MYSQL_PORT
});

module.exports = connection
