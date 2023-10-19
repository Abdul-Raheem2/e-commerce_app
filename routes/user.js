const express = require('express');
const db = require('../db')
const userRouter = express.Router({mergeParams:true});


userRouter.get('/register',(req,res)=>{
    res.send('Register');
});

userRouter.get('/login',async (req,res)=>{
    const users = await db.query('SELECT * FROM users')
    res.json(users.rows);
});

module.exports = userRouter;