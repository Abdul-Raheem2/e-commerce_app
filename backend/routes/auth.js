const express = require('express');
const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');

const authRouter = express.Router({mergeParams:true});

authRouter.post('/register',[
    check('email').isEmail(),
    check('password').isLength({min:8})
],async (req,res,next)=>{
    try{
        if(!validationResult(req).isEmpty()){
            console.log(validationResult(req));
            return res.status(400).send('Enter a valid email and password');
        }
        const {email,password,firstName,lastName} = req.body;
        const user = await db.userExists(email);
        if(user){
            console.log(user);
            if(user.auth_method==='google'){
                return res.status(409).json({google:true});
            }else{
                return res.status(409).json({google:false});
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const addedUser = await db.addUser(email,hashPassword,firstName,lastName,'local');
        res.status(201).send('user created')
    }catch (error){
        next(error);
    }

});

authRouter.post("/login",(req,res,next)=>{
    if(req.session.basketId){
        res.cookie('basketId',req.session.basketId,{secure:true});
        console.log(req.session.basketId);
    }
    next();
},passport.authenticate('local'),(req,res,next)=>{
    if(req.isAuthenticated()){
        res.status(200).send();
    }else{
        res.status(400).send();
    }
});

authRouter.get('/login/google',(req,res,next)=>{
    if(req.session.basketId){
        res.cookie('basketId',req.session.basketId,{secure:true})
        console.log(req.session.basketId);
    }
    next();
},passport.authenticate('google'));

authRouter.get('/oauth2/redirect/google', passport.authenticate('google',{
    successRedirect: `${process.env.FRONT_END_BASE_URL}/`,
    failureRedirect: `${process.env.FRONT_END_BASE_URL}/login`
}));

authRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){return next(err)}
        res.status(200).send();
    })
});

module.exports = authRouter;