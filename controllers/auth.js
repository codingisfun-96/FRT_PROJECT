const db = require('../config/database');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const encryption = require('../public/js/encryption');
const salt=process.env.SALT;
app.use(express.json);

/////////////////Login API////////////////////
exports.login = (req,res) => {
    var form = {
        email: req.body.email,
        password:req.body.pass,
    };
    try{ 
        const{email,pass}= req.body;
        if(!email || !pass){
            return res.status(400).render('login',{
                message: 'Please fill all fields!',
                error:true,
                form:form
            })    
        } 
        db.query('SELECT * FROM users WHERE email= ?',[email], async(error,results)=>{
            if( !results || !(await bcrypt.compare(pass+salt, results[0].password))){
                return res.status(400).render('login',{
                    message: 'Email or password is incorrect!',
                    error:true,
                    form:form
                })
            }else{
                const id = results[0].userid;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                
                const cookieOptions={
                    expires: (Date.now() + process.env.JWT_COOKIE_EXPIRES *24 *60 *60 *1000),
                    httpOnly: true
                }
                res.cookie('jwt',token, cookieOptions);
                var user_id= results[0].userid;
                db.query('UPDATE users SET jwt= ? WHERE userid = ?',[token,id] ,async(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                    db.query('SELECT * FROM password_table WHERE userid = ?',[user_id], async(error,rows)=>{
                    return res.status(200).render('dash', { 
                        rows:results,
                        data:rows,
                        rows:results    
                    })     
                    });       
            }})
        }});
    } catch(error){
        console.log(error)
    }

}
/////////////////Signup APi//////////////////
exports.signup = async(req,res) => {
    const{fname,lname,email,pass,pass2} = req.body;
    var form = {
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        password:req.body.pass,
        password2:req.body.pass2
    };
    if(!fname || !lname || !email || !pass || !pass2){
        return res.status(400).render('signup',{ 
            message: "Please fill all fields!",
            error:true,
            form: form,
        });
    }
    if (pass.length < 8){
        return res.status(400).render('signup',{
            message: 'Password must be 8 characters',
            error:true,
            form:form
        })    
    }
    if (!req.files){
    return res.status(400).render('signup',{ 
        message: "No files were uploaded!",
        error:true,
        form:form
    });
    }
    var file = req.files.propic;
    var img_name= Date.now()+file.name;
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){                     
        file.mv('public/uploads/'+Date.now()+file.name, function(err) {              
            if (err){
                return res.status(500).send(err);
            }else{
            db.query('SELECT email from users WHERE email = ?', [email], async(error, results) => {
                if (error){
                    console.log(error);
                }
                if (results.length > 0){
                    return res.render('signup',{
                        message: "Email is already in use!",
                        error:true,
                        form: form
                    });
                }else if(pass !== pass2){
                    return res.render('signup',{
                        message: "Passwords do not match",
                        error:true,
                        form: form
                    });
                }
                else if (file.size > 1024000){
                    return res.render('signup',{
                        message: "Max. file limit is 1mb only!",
                        error:true,
                        form: form
                    })
                }
                const salt = process.env.SALT;
                let hashedPassword = await bcrypt.hash(pass+salt, 8);
                db.query('INSERT into  users SET ?', {image:img_name ,firstname:fname, lastname:lname, email:email, password:hashedPassword}, (error,results)=>{
                    if(error){
                        console.log(error);
                    } else {
                        return res.render('signup',{
                            message: "New user registered!",
                            success:true
                    });
                }})
            });
        } 
        
    });

    }else {
        return res.status(400).render('signup',{
        message:"This format is not allowed!",
        form:form,
        error: true
    });
    }
}

//////////Forgot Password API//////////////

// exports.forgotpassword = (req,res) =>{
//     const{email} = req.body;
//     var form = {email: req.body.email};
//     if(!email){
//         return res.status(400).render('forgot-pass',{ 
//             message: "Please fill all fields!",
//             error:true,
//             form: form,
//         });
//     }
//     db.query('SELECT email from users WHERE email = ?', [email],async(error,results)=>{
//         if(results.length > 0){
//             db.query('SELECT * from users WHERE email = ?', [email],async(error,rows)=>{
//             const secret = process.env.JWT_SECRET + rows[0].password;
//             const id = rows[0].userid;
//             const token = jwt.sign({id}, secret, {expiresIn: process.env.JWT_LINK_EXPIRES_IN});
//             const link = `http://localhost:3000/auth/reset-password/${id}/${token}`
//             console.log(link);
//             res.status(200).render('forgot-pass',{
//                 message: 'Reset link has been sent to your e-mail successfully! This link will be valid only for 20 minutes',
//                 success: true
//             })
//         })
//         }else{
//             res.status(400).render('forgot-pass',{
//                 message: 'Email does not exist. Please Signup!',
//                 error: true,
//                 form: form
//             })
//         }
//     })
// }  

// //////////Password Reset GET API//////////////
// exports.loadresetpassword = (req,res) =>{
//     const {id,token} = req.params;
//     db.query('SELECT email from users WHERE userid = ?', [id],async(error,results)=>{
//         if(results.length > 0){
//             db.query('SELECT * from users WHERE userid = ?', [id],async(error,rows)=>{
//             const secret = process.env.JWT_SECRET + rows[0].password;
//             try{
//             const payload = jwt.verify(token, secret);
//             return res.status(200).render('reset-password',{
//                 rows:rows,
//                 })
//             }catch(error){
//                 return res.status(400).render('reset-password',{
//                     message: 'Invalid token',
//                     error:true
//                 })
//             } 
//         })
//         }else{
//             return res.status(400).render('reset-password',{
//                 message: 'Invalid ID',
//                 error:true
//             })
//         }
//     })
// }

// //////////Password Reset POST API//////////////
// exports.resetpassword = (req,res) =>{
//     const {id,token} = req.params;
//     db.query('SELECT email from users WHERE userid = ?', [id],async(error,results)=>{
//         if(results.length > 0){
//             db.query('SELECT * from users WHERE userid = ?', [id],async(error,rows)=>{
//             return res.status(200).render('reset-password')
//             })
//         }else{
//             return res.status(400).render('reset-password',{
//                 message: 'Invalid ID',
//                 error:true
//             })
//         }
//     })
// }