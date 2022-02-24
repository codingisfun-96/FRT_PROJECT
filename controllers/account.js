const db = require('../config/database');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const encryption = require('../public/js/encryption');
const salt=process.env.SALT;
app.use(express.json);

//--------load data---------
exports.load_account = (req,res)=>{
    var token = req.cookies.jwt;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,user_results)=>{
        var user_id = user_results[0].userid;
        db.query('SELECT * FROM notes_table WHERE userid= ?',[user_id], async(error,notes_result)=>{

            db.query('SELECT * FROM password_table WHERE userid= ?',[user_id], async(error,password_result)=>{
                // console.log(user_results,notes_result,password_result);
                res.json({
                    user:user_results[0],
                    notes:notes_result,
                    password:password_result
                });
            });
        });

    });
}