const express = require('express');
const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');
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

authRouter.post("/login",(req,res,next)=>{
    res.locals.basketId = req.session.basketId;
    if(req.isAuthenticated()){
        res.status(200).send();
    }else{
        next();
    }
},passport.authenticate('local'),async (req,res,next)=>{
    if(req.isAuthenticated()){
        try{
            const basket = await db.checkUserBasket(req.user.id);
            if(basket){
                if(res.locals.basketId){
                    await db.combineBaskets(basket.id,res.locals.basketId);
                }
                req.session.basketId = basket.id;
            }else{
                if(res.locals.basketId){
                    db.setUserBasket(req.user.id,res.locals.basketId);
                    req.session.basketId = res.locals.basketId;
                }else{
                    const newBasket = await db.newBasket(req.user.id);
                    req.session.basketId = newBasket.id;
                }
            }
            res.status(200).send();
        }catch(err){
            next(err);
        }

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