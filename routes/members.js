import express from 'express';
import { User } from '../models/users.js';
import { Message } from '../models/messages.js';
import { genPassword } from '../lib/passwordUtils.js';
import { checkUsername, checkPassword } from './middlleware.js';
import passport from 'passport';
import { config } from 'dotenv';

const router = express.Router();
config();

router.get('/', async (req, res) => {
    try{
        const messages = await Message.find()
        	.populate('user')
            .exec();
        res.render('index', {authentication: req.isAuthenticated(), user: req.user || false , messages: messages});
    } catch(err){
        console.log(err);
    }
})

router.get('/sign-up', (req,res) => {
    if(req.isAuthenticated()) res.redirect('/')
    else res.render('members/sign-up',{err: false, msg:'', authentication: req.isAuthenticated()});
})

router.get('/log-in', (req,res) => {
    if(req.isAuthenticated()) res.redirect('/')
    else res.render('members/log-in',{authentication: req.isAuthenticated()});
})

router.get('/become-member', (req,res) => {
    if(req.isAuthenticated()) res.render('members/becomeMember',{authentication: req.isAuthenticated()})
    else res.redirect('/');
})

router.get('/create-message',(req,res) => {
    if(req.isAuthenticated()) res.render('members/createMessage',{authentication: req.isAuthenticated()})
    else res.redirect('/');
})

router.get('/log-out', (req,res,next) => {
    if(req.isAuthenticated()){
        req.logout(err => {
            if(err) return next(err);
        });
        res.redirect('/log-in');
    }
    else res.redirect('/');
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
        membership: false,
        isAdmin: false,
        tryToBeMember: true
    })

    newUser.save();
    res.redirect('/');
})

router.post('/create-message', async (req,res) => {
    const newMessage = new Message({
        text: req.body.text
    })
    newMessage.user = req.user._id;
    newMessage.save();
    res.redirect('/');
})

router.post('/become-member', async (req,res) => {
    try{
        const user = await User.findById(req.session.passport.user);
        if(user.tryToBeMember){
            if(req.body.passwordForMembership === process.env.MEMBERSHIP_CODE){
                user.membership = true;
            }
            user.tryToBeMember = false;
            await user.save();
            res.redirect('/');
        }
        else res.redirect('/');
    } catch(err){   
        console.log(err);
    }
})

router.delete('/delete/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const result = await Message.findByIdAndDelete(id);
        res.json({redirect: '/'})
    } catch(err) {
        console.log(err);
    }
})



export default router;