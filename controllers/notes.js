const db = require('../config/database');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const encryption = require('../public/js/encryption');
const salt=process.env.SALT;
app.use(express.json);


//---------------load data--------------
exports.load_data_notes = (req,res)=>{
    var token = req.cookies.jwt;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;

        db.query('SELECT * FROM notes_table WHERE userid= ?',[user_id], async(error,result)=>{

            // console.log(result);
            // console.log(results[0].firstname);
            res.json({
                user:results[0],
                notes:result
            });

        });    
    });
};
//----------Add Notes------------
exports.add_notes = (req,res)=>{
    // console.log(req.body);
    const{title,text}=req.body;
    var token = req.cookies.jwt;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        db.query('SELECT * from notes_table WHERE userid = ? AND title = ?', [user_id,title], async(error,rows) => {
            if (rows.length > 0){
                res.json({
                    state:false,
                    message:'This title already exists'
                });
            }else{
                db.query('INSERT into notes_table SET ?', {userid:user_id ,title:title,body:text}, (error)=>{
                    if(error)
                    {
                        console.log(error);
                    }else{
                        res.json({
                            state:true,
                            message:'Notes added'
                        });
                    }
                });
            }
        });
    });
};
//-----------------view_notes----------
exports.view_notes = (req,res)=>{
    // console.log(req.body);
    var token = req.cookies.jwt;
    const{title}=req.body;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        db.query('SELECT * from notes_table WHERE userid = ? AND title = ?', [user_id,title], async(error,rows) => {
            res.json({
                state:true,
                title:rows[0].title,
                body:rows[0].body
            });
        });
    });
};

//-------------update notes----------------
exports.update_notes=(req,res)=>{
    var token = req.cookies.jwt;
    const{title,text}=req.body;
    
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        
        db.query('UPDATE notes_table SET body = ? WHERE userid = ? AND title = ?',[text,user_id,title], async(error,results)=>{
            res.json({
                state:true,
                message:"Updated note"
            });
        });
    });
}
//-------------Delete Notes--------------
exports.delete_notes=(req,res)=>{
    const {title}=req.body;
    var token = req.cookies.jwt;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        db.query('DELETE FROM notes_table WHERE userid= ? AND title = ?',[user_id,title], async(error,result)=>{
            res.json({
                state:true,
                message:"Deleted note"
            });
        });
    });
}