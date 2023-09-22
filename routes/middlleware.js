import { User } from '../models/users.js';

export const checkUsername = async (req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(user) res.render('members/sign-up',{err: true, msg: 'Username is already in use'});
        else next();
    } catch(err) {
        console.log(err);
    }
}

export const checkPassword = (req,res,next) => {
    if(req.body.password1.length < 8) res.json({err: true, msg: 'Password too short, minimum length is 8 chars'});
    else if(req.body.password1 !== req.body.password2) res.render('members/sign-up',{err: true, msg: 'Passwords don\'t match'});
    else next();

}