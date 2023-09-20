import express from 'express';
import { User } from '../models/users.js';

const router = express.Router();

router.get('/sign-up', (req,res) => {
    res.render('members/sign-up');
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

router.post('/sign-up',(req,res) => {
    // const newUser = new User({
    //     name: 'Mario',
    //     surname: 'Kozul',
    //     username: 'mkozul10',
    //     password: 'sifra123',
    //     membership: false
    // })
    // newUser.save();
})



export default router;