const express = require('express');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');

//const swaggerUi = require('swagger-ui-express');
//const openApiDocumentation = require('./openapi.json');

const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(helmet());

app.use(cors({
  origin: process.env.FRONT_END_BASE_URL,
  credentials:true}));
app.use(logger('dev'));

const stripeRouter = require('./routes/stripe');
app.use('/stripe_webhooks',stripeRouter);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV==='production'){
  app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 1000*60*60*24,
      secure: true,
      httpOnly:true,
      sameSite:'none'
    },
    resave: false,
    saveUninitialized: false
  }));
}else{
  app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 1000*60*60*24,
      secure: false,
    },
    resave: false,
    saveUninitialized: true
  }));
}


app.use(passport.initialize());
app.use(passport.session());

require('./utils/passport');

const productRouter = require('./routes/products');
app.use('/products',productRouter);

const basketRouter = require('./routes/basket');
app.use('/basket',basketRouter);

const checkoutRouter = require('./routes/checkout');
app.use('/checkout',checkoutRouter);

const orderRouter = require('./routes/orders');
app.use('/orders',orderRouter);

const accountRouter = require('./routes/account');
app.use('/account',accountRouter);

const authRouter = require('./routes/auth');
app.use('/',authRouter);



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