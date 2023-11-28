const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oidc");
const bcrypt = require("bcrypt");
const db = require('../db');

passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'},async function verify(email,password, done) {
    try{
        const user = await db.findUserByEmail(email);
        if(!user) {return done(null,false)}
        if(user.auth_method !=='local'){return done(null,false)}
        const matchedPassword = await bcrypt.compare(password,user.password);
        if(!matchedPassword) {return done(null,false)}
        done(null,user);
    }catch(error){
        return done(error)
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile','email' ]
  }, async function verify(issuer, profile, done) {
        try{
            const email = profile.emails[0].value;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            let user = await db.findUserByEmail(email);
            if(!user) {
                user = await db.addUser(email,null,firstName,lastName,'google');
            }
            done(null,user);
        }catch(error){
            return done(error)
        }
    }
));

passport.serializeUser(function(user,done){
    process.nextTick(function() {
        done(null,{ id: user.id, email: user.email, firstName: user.firstName, lastName:user.lastName });
    });
})

passport.deserializeUser(function(user,done){
    process.nextTick(function() {
        done(null,user);
    });
})