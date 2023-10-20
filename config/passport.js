const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require('../db');

passport.use(new LocalStrategy(async function verify(username,password, done) {
    try{
        const user = await db.findUserByEmail(username);
        if(!user) {return done(null,false)}
        const matchedPassword = await bcrypt.compare(password,user.password);
        if(!matchedPassword) {return done(null,false)}
        done(null,user);
    }catch(error){
        return done(error)
    }
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(async function(id,done){
    try{
        const user = await db.findUserById(id);
        done(null,user);
    }catch{
        done(err);
    }
})