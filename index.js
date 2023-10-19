const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors());

const logger = require('morgan');
app.use(logger('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const passport = require('passport');
const session = require('express-session');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 86400000, secure: true },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res)=>{
    res.send('Home');
});

const userRouter = require('./routes/user.js');
app.use('/user',userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});