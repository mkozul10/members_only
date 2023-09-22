import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { connection } from './database.js';
import { User } from '../models/users.js';
import { validPassword } from '../lib/passwordUtils.js';


const verifyCallback = async (username, password, cb) => {
    try {
        const user = await User.findOne({username: username});
        if(!user) return cb(null, false);
        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid) return cb(null, user);
        else return cb(null, false);

    } catch(err) {
        cb(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser(async (userId, cb) => {
    try {
        const user = await User.findById(userId)
        cb(null, user);
    } catch(err) {
        cb(err);
    }
})