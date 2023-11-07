const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const checkAuthenticated = require('../utils/authenticated');

const accountRouter = express.Router({mergeParams:true});

accountRouter.use(checkAuthenticated);

accountRouter.get('/',(req,res)=>{
    res.send(req.user);
})

accountRouter.put('/',async (req,res,next)=>{
    try{
        let updatedUser = req.user;
        let newValues = false;
        const email = req.body.email || updatedUser.email;
        if(email !== updatedUser.email){
            newValues=true;             
            const user = await db.userExists(email);
            if(user){
                return res.status(400).send('email is already in use');
            }
        }
        const firstName = req.body.firstName || updatedUser.firstName;
        const lastName =req.body.lastName || updatedUser.lastName;
        firstName !== updatedUser.firstName && (newValues=true);
        lastName !== updatedUser.lastName && (newValues = true);
        console.log(newValues);
        if(newValues){
            updatedUser = await db.updateUser(updatedUser.id,email,firstName,lastName);
        }
        res.status(200).json(updatedUser);
    }catch(error){next(error)}
})

accountRouter.put('/password',async (req,res,next)=>{
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

accountRouter.delete('/',(req,res,next)=>{
    try{
        db.deleteUser(req.user.id);
        req.logout((err)=>{
            if(err){return next(error)}
            res.redirect('/');
        })
    }catch(error){next(error)}
})

module.exports = accountRouter;