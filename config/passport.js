const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require('../db');

passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'},async function verify(email,password, done) {
    try{
        const user = await db.findUserByEmail(email);
        if(!user) {return done(null,false,{message:'The username or password is incorrect'})}
        const matchedPassword = await bcrypt.compare(password,user.password);
        if(!matchedPassword) {return done(null,false,{message:'The username or password is incorrect'})}
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
        done(null,{
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        });
    }catch{
        done(err);
    }
})