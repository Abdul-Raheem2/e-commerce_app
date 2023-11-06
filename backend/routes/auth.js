const express = require('express');
const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');
const e = require('express');
const {check,validationResult} = require('express-validator');

const authRouter = express.Router({mergeParams:true});

authRouter.post('/register',[
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min:8})
],async (req,res,next)=>{
    try{
        if(!validationResult(req).isEmpty()){
            console.log(validationResult(req));
            return res.status(400).send('Enter a valid email and password');
        }
        const {email,password,first_name:firstName,last_name:lastName} = req.body;
        const user = await db.userExists(email);
        if(user){
            return res.status(409).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const addedUser = await db.addUser(email,hashPassword,firstName,lastName);
        res.status(201).send('user created')
    }catch (error){
        next(error);
    }

});

authRouter.post("/login", passport.authenticate('local'),(req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).send();
    }else{
        res.status(401).send();
    }
});

authRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){return next(error)}
        res.status(200).send();
    })
});

module.exports = authRouter;