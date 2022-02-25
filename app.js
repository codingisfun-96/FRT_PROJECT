const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser =require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { DATETIME, TIMESTAMP } = require('mysql/lib/protocol/constants/types');
dotenv.config({path: './.env'});

const app = express();
// const sslServer= https.createServer(
//     {
//             key: fs.readFileSync(etc/letsencrypt/live/),
//             cert: fs.readFileSync(etc/letsencrypt/live/)
//     },app)
    
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.set('views', path.join(__dirname, 'views'));

//View engine->hbs
app.set('view engine', 'hbs');

//Server config
app.listen(process.env.APP_PORT, () => console.log("App running at port:",process.env.APP_PORT));

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/password',require('./routes/password'));
app.use('/notes',require('./routes/notes'));
app.use('/account',require('./routes/account'));
console.log(TIMESTAMP.toString());


module.exports = app;