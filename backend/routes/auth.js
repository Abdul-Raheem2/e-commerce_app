const express = require('express');
const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');

const authRouter = express.Router({mergeParams:true});

authRouter.post('/register',async (req,res,next)=>{
    try{
        const {email,password,first_name:firstName,last_name:lastName} = req.body;
        if(!email || !password){
            return res.status(400).send('Enter a username and password');
        }
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

authRouter.post("/login", passport.authenticate('local',{
    successRedirect: '/login/success',
    failureRedirect:'/login/failed'
}));

authRouter.get('/login/success',(req,res)=>{
    if(req.isAuthenticated()){
        res.send('Successfully logged in')
    }else{
        res.redirect('/login/failed');
    }
})
authRouter.get('/login/failed',(req,res)=>{
    res.send('Incorrect email or password');
})

authRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){return next(error)}
        res.redirect("/");
    })
});

module.exports = authRouter;