import express from 'express';
import { User } from '../models/users.js';
import { genPassword } from '../lib/passwordUtils.js';
import { checkUsername, checkPassword } from './middlleware.js';
import passport from 'passport';

const router = express.Router();

router.get('/sign-up', (req,res) => {
    res.render('members/sign-up',{err: false, msg:''});
})

router.get('/log-in', (req,res) => {
    res.render('members/log-in');
})

router.get('/become-member', (req,res) => {
    res.render('members/becomeMember');
})

router.get('/become-admin', (req,res) => {
    res.render('members/becomeAdmin');
})

router.get('/create-message',(req,res) => {
    res.render('members/createMessage');
})

router.get('/log-out', (req,res,next) => {
    req.logout(err => {
        if(err) return next(err);
    });
    res.redirect('/log-in');
})

router.post('/log-in',passport.authenticate('local', {failureRedirect: '/sign-up', successRedirect: '/'}));

router.post('/sign-up',checkUsername,checkPassword,(req,res) => {
    const saltHash = genPassword(req.body.password1);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        hash: hash,
        salt: salt,
        membership: false
    })

    newUser.save();
    res.redirect('/');
})



export default router;