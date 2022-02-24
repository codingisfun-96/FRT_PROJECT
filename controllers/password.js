const db = require('../config/database');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const encryption = require('../public/js/encryption');
const salt=process.env.SALT;
app.use(express.json);

/////////////Add password API//////////////////
exports.add_password = (req,res) =>{
    // console.log(req.body);
    const{userid,input_pass,input_email,input_web_pass,input_website,input_website_url} = req.body;
    var token = req.cookies.jwt;
        
            const cypher = encryption.encrypt(input_web_pass,input_pass);
            // console.log(cypher);
                //     var user_id = results[0].userid;
                    db.query('SELECT * from password_table WHERE userid = ? AND website = ? AND input_email = ?', [userid,input_website,input_email], async(error,rows) => {
                        if (rows.length > 0){
                            // console.log("Record already exists");
                            // db.query('SELECT * FROM password_table WHERE userid = ?',[user_id], async(error,rows)=>{
                            //     res.status(200).render('dash', { 
                            //         message: 'This record already exists!',
                            //         error: true,
                            //         rows:results,
                            //         data:rows     
                            //     })
                            // })
                            res.json({
                                state:false,
                                message:'This record already exists'
                            });
                        }
                        if(rows.length == 0){
                            // console.log("Record does not exists");
                            db.query('INSERT into password_table SET ?', {userid:userid ,website:input_website,url:input_website_url, input_email:input_email, pass:cypher}, (error)=>{
                                if(error){
                                    console.log(error);
                                }else{ 
                                    // db.query('SELECT * FROM password_table WHERE userid = ?',[user_id], async(error,rows)=>{
                                    // res.status(200).render('dash', { 
                                    //     message: 'Record added successfully!',
                                    //     success: true,
                                    //     rows:results,
                                    //     data:rows
                                    //     })
                                    // })
                                    res.json({
                                        state:true,
                                        message:'Record added'
                                    });
                                }
                            });
                }})
            }
            
                


/////////////View Password API///////////////
exports.view_password = (req,res) => {
    var token = req.cookies.jwt;
    const{website_name,website_link,website_usr,input_pass}=req.body;
    
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        if( await bcrypt.compare(input_pass+salt, results[0].password)){
            db.query('SELECT * FROM password_table WHERE userid= ? AND website = ? AND input_email = ?',[user_id,website_name,website_usr], async(error,results)=>{
                var decrypted = encryption.decrypt(results[0].pass,input_pass);
                res.json({
                    state:true,
                    website:results[0].website,
                    website_url:results[0].url,
                    user:results[0].input_email,
                    password:decrypted
                });
            });
        }else{
            
            res.json({
                state:false,
                message:"Wrong password"
            });
        };
        
    });
}

/// Delete API //////////

exports.delete_password = (req,res) => {
    const{website_name,website_usr}=req.body;
    var token = req.cookies.jwt;
    // console.log(req.body);

    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        
        // if( await bcrypt.compare(input_pass+salt, results[0].password)){
            db.query('DELETE FROM password_table WHERE userid= ? AND website = ? AND input_email = ?',[user_id,website_name,website_usr], async(error,result)=>{
                // console.log(result);
                if(error){

                }else{
                res.json({
                    state:true
                });
            }
            });
        // }else{
            
            // res.json({
            //     state:false,
            //     message:"Wrong password"
            // });
        // };
        
    });
};

//-----------------Load Data------------------

exports.load_data_password = (req,res) => {
    
    var token = req.cookies.jwt;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;

        db.query('SELECT * FROM password_table WHERE userid= ?',[user_id], async(error,result)=>{

            // console.log(result);
            // console.log(results[0].firstname);
            res.json({
                user:results[0],
                passwords:result
            });

        });    
    });
};

//----------------Check Password------------------

exports.check_password = (req,res) => {
    var token = req.cookies.jwt;
    // console.log(req.body);
    input_pass = req.body.input_pass;
    db.query('SELECT * FROM users WHERE jwt= ?',[token], async(error,results)=>{
        var user_id = results[0].userid;
        if( await bcrypt.compare(input_pass+salt, results[0].password)){
            // console.log(input_pass,"passowrd match");
            res.json({
                user:results[0].userid,
                state:true
            });
        }else{
            // console.log(input_pass,"passowrd does not match");
            res.json({
                user:results[0].userid,
                state:false
            });
        }
    });
}


//------------------Update Password-------------
exports.update_password=(req,res)=>{
    // console.log("update password",req.body);
    const{userid,input_pass,input_website,input_website_url,input_email,input_web_pass}=req.body;
    var cypher = encryption.encrypt(input_web_pass,input_pass);
    
    db.query('UPDATE password_table SET url = ?,pass = ? WHERE userid = ? AND website = ? AND input_email = ?',[input_website_url,cypher,userid,input_website,input_email], async(error,results)=>{
        res.json({
            state:true,
            message:"Updated record"
        });
    });
}