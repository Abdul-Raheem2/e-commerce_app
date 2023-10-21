const express = require('express');
const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');

const userRouter = express.Router({mergeParams:true});


userRouter.post('/register',async (req,res,next)=>{
    try{
        const {email,password,first_name,last_name} = req.body;
        if(!email || !password){
            return res.status(400).send('Enter a username and password');
        }
        const user = await db.userExists(email);
        if(user){
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const addedUser = await db.addUser(email,hashPassword,first_name,last_name);
        if(addedUser) {res.status(201).send('user created')}
        else {next(new Error())}
    }catch (error){
        next(error);
    }

});

userRouter.post("/login", passport.authenticate('local',{
    successRedirect: 'user',
    failureMessage:true,
    failureRedirect:'/login'
}));
  

userRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){return next(error)}
        res.redirect("/");
    })
});


userRouter.get('/user',(req,res)=>{
    if(req.isAuthenticated()){
        res.send(req.user);
    }else{
        res.status(401).send('Not logged in');
    }
})

userRouter.put('/user',async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            let newValues = false;
            let {id,email,first_name,last_name} = req.user;
            if(req.body.email && req.body.email!==email){             
                email=req.body.email;
                newValues=true;
                const user = await db.userExists(email);
                if(user){
                    return res.status(400).send('email is already in use');
                }
            }if(req.body.first_name && req.body.first_name!==first_name){
                newValues=true;
                first_name=req.body.first_name;
            }if(req.body.last_name && req.body.last_name!==last_name){
                newValues=true
                last_name=req.body.last_name;
            }
            let updated = true;
            if(newValues){
                updated = await db.updateUser(id,email,first_name,last_name);
            }
            if(updated){res.status(200).send('user details updated')}
            else{next(new Error())}
        }else{
            res.status(401).send('Not logged in');
        }
    }catch(error){next(error)}
})

userRouter.put('/password',async (req,res,next)=>{
    try{
        const {current_password,new_password}= req.body;
        if(!new_password || !current_password){
            return req.status(400).send('enter new and current password')
        }
        const user = await db.findUserById(req.user.id);
        const matchedCurrentPassword = await bcrypt.compare(current_password,user.password);
        if(!matchedCurrentPassword) {return req.status(400).send('current password incorrect')}
        else{
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(new_password,salt);
            const updated = await db.updatePassword(req.user.id,hashPassword);
            if(updated){res.status(200).send('password updated')}
            else{next(new Error())}
        }
    }catch(err){next(err)}
})

userRouter.delete('/user',(req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            db.deleteUser(req.user.id);
        }
        req.logout((err)=>{
            if(err){return next(error)}
            res.redirect('/');
        })
    }catch(error){next(error)}
})


userRouter.get('/login',(req,res)=>{
    if(req.session.messages){
        const message = req.session.messages[0];
        req.session.messages = null;
        res.status(400).send(message)
    }
    else {res.send('login')}
})

module.exports = userRouter;