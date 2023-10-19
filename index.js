const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', (req,res)=>{
    res.send('test')
});

const userRouter = require('./routes/user.js');
app.use('/user',userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});