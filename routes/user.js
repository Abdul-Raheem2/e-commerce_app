const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const userRouter = express.Router({mergeParams:true});


userRouter.post('/register',async (req,res)=>{
    try{
        const {email,password,first_name,last_name} = req.body;
        const user = await db.userExists(email);
        if(user){
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const result = await db.addUser(email,hashPassword,first_name,last_name);
        res.status(200).send('User added');
    }catch (error){
        console.log(error);
        res.status(500).send();
    }

});

userRouter.get('/login',async (req,res)=>{
    db.query('SELECT * FROM users WHERE id = 3',null,(error,results)=>{
        if(error){
            res.status(400).send();
        }else{
            res.status(200).json(results.rows);
        }
    });
});

module.exports = userRouter;