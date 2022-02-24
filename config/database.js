const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
//Database connection
const db = mysql.createConnection({
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
db.connect((err) => {
    if (err){
        throw err;
    }
    else{
        console.log('MySQL connected...');
    }
})
module.exports = db;