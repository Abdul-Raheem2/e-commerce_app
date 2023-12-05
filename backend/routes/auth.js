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
            return res.status(400).send('Enter a valid email and password');
        }
        const {email,password,firstName,lastName} = req.body;
        const user = await db.userExists(email);
        if(user){
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
        res.locals.basketId = req.session.basketId;
    }
    next();
},passport.authenticate('local'),async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const userBasket = await db.checkUserBasket(req.user.id);
            if(userBasket){
                if(res.locals.basketId){
                    await db.combineBaskets(userBasket.id,res.locals.basketId);
                }
                req.session.basketId = userBasket.id;
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
        }else{
            res.status(400).send();
        }
    }catch(err){
        next(err);
    }
});

authRouter.get('/login/google',passport.authenticate('google'));

authRouter.get('/oauth2/redirect/google',(req,res,next)=>{
    if(req.session.basketId){
        res.locals.basketId = req.session.basketId;
    }
    next();
}, passport.authenticate('google',{
    failureRedirect: `${process.env.FRONT_END_BASE_URL}/login`
}),async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const userBasket = await db.checkUserBasket(req.user.id);
            if(userBasket){
                if(res.locals.basketId){
                    await db.combineBaskets(userBasket.id,res.locals.basketId);
                }
                req.session.basketId = userBasket.id;
            }else{
                if(res.locals.basketId){
                    db.setUserBasket(req.user.id,res.locals.basketId);
                    req.session.basketId = res.locals.basketId;
                }else{
                    const newBasket = await db.newBasket(req.user.id);
                    req.session.basketId = newBasket.id;
                }
            }
            res.redirect(`${process.env.FRONT_END_BASE_URL}`);
        }else{
            res.redirect(`${process.env.FRONT_END_BASE_URL}/login`);
        }
    }catch(err){next(err)}
});

authRouter.post("/logout", (req, res,next) => {
    req.logout((err)=>{
        if(err){return next(err)}
        res.status(200).send();
    })
});

module.exports = authRouter;