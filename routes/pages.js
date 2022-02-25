const express= require("express");
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

//Index page
router.get('/', function(req, res) {
  res.render('index');
});
//Login page
router.get('/login', function(req, res) {
  res.render('login');
});
//Signup page
router.get('/signup', function(req, res) {
  res.render('signup');
});
//Notes page
router.get('/notes-page', function(req, res) {
  
  res.render('notes-dash');
});
//Password page
router.get('/password-page', function(req, res) {
  
  res.render('dash');
});
//Account page
router.get('/account', function(req, res) {
  
  res.render('account');
});
//About Page
router.get('/about', function(req, res) {
  
  res.render('about');
});
//Logout
router.get('/logout', function(req, res) {
  
  const nothing="";
  var token = req.cookies.jwt;
  db.query('UPDATE users SET jwt =? WHERE jwt= ?',[nothing,token], async(error,user_results)=>{
    res.clearCookie("jwt", {path:"/",httpOnly:true});
    req.
    res.json({
      state:true
    });
  });

});
  

module.exports = router;