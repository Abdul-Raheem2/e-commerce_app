const express = require('express');
const passport = require('passport');
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
        res.redirect('login');
    }catch (error){
        console.log(error);
        res.status(500).send();
    }

});

userRouter.post("/login", passport.authenticate('local',{
    successRedirect: 'user'
}));
  

userRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){console.log(err)}
        res.redirect("/");
    })
});


userRouter.get('/user',(req,res)=>{
    res.send(`Hello ${req.user.first_name} ${req.user.last_name}`);
})
userRouter.get('/login',(req,res)=>{
    res.send('login');
})

userRouter.get('/protected',(req,res)=>{
    if(req.isAuthenticated()){
        res.send('authenticated');
    }else{
        res.send('not authenticated');
    }
})

module.exports = userRouter;