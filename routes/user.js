const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const checkAuthenticated = require('../utils/authenticated');

const userRouter = express.Router({mergeParams:true});

userRouter.use(checkAuthenticated);

userRouter.get('/',(req,res)=>{
    res.send(req.user);
})

userRouter.put('/',async (req,res,next)=>{
    try{
        let newValues = false;
        let {id,email,firstName,lastName} = req.user;
        if(req.body.email && req.body.email!==email){             
            email=req.body.email;
            newValues=true;
            const user = await db.userExists(email);
            if(user){
                return res.status(400).send('email is already in use');
            }
        }if(req.body.firstName && req.body.firstName!==firstName){
            newValues=true;
            firstName=req.body.firstName;
        }if(req.body.lastName && req.body.lastName!==lastName){
            newValues=true
            lastName=req.body.lastName;
        }
        if(newValues){
            await db.updateUser(id,email,firstName,lastName);
        }
        res.status(200).send('user details updated')
    }catch(error){next(error)}
})

userRouter.put('/password',async (req,res,next)=>{
    try{
        const {currentPassword,newPassword}= req.body;
        if(!newPassword || !currentPassword){
            return req.status(400).send('enter new and current password')
        }
        const user = await db.findUserById(req.user.id);
        const matchedCurrentPassword = await bcrypt.compare(currentPassword,user.password);
        if(!matchedCurrentPassword) {return req.status(400).send('current password incorrect')}
        else{
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword,salt);
            const updated = await db.updatePassword(req.user.id,hashPassword);
            res.status(200).send('password updated')
        }
    }catch(err){next(err)}
})

userRouter.delete('/',(req,res,next)=>{
    try{
        db.deleteUser(req.user.id);
        req.logout((err)=>{
            if(err){return next(error)}
            res.redirect('/');
        })
    }catch(error){next(error)}
})

module.exports = userRouter;