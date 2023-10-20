const express = require('express');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require('./db'); 
const cors = require('cors');
const logger = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000*60*60*24},
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

const userRouter = require('./routes/user.js');
app.use('/',userRouter);

app.get('/', (req,res)=>{
    if(req.session.viewCount){
        req.session.viewCount++;
    }else{
        req.session.viewCount=1;
    }
    res.send(`<h1>Views:${req.session.viewCount}</h1>`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});