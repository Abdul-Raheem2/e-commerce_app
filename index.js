const express = require('express');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');

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

require('./utils/passport');

const productRouter = require('./routes/products');
app.use('/products',productRouter);

const basketRouter = require('./routes/basket');
app.use('/basket',basketRouter);

const userRouter = require('./routes/user');
app.use('/',userRouter);

app.get('/', (req,res)=>{
    if(req.session.viewCount){
        req.session.viewCount++;
    }else{
        req.session.viewCount=1;
    }
    res.send(`<h1>Views:${req.session.viewCount}</h1>`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send();
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});