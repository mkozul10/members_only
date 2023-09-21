import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { connectDB } from './config/database.js';
import memberRoutes from './routes/members.js';
import passport from 'passport';
import session from 'express-session';
import { connection } from './config/database.js';
import MongoStore from 'connect-mongo';

import './config/passport.js'; 


//init app, parsers, & env variables
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
config();


//mongoDB & app server connection
connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


//registering view engine
app.set('view engine','ejs');

//middleware
app.use(express.static('public'));
app.use(morgan('dev'));

//parsers
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//session setup
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING, 
    collectionName: 'sessions', 
    mongooseConnection: connection
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, 
    store:mongoStore,    
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//passport auth

import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})


app.get('/', (req, res) => {
    res.render('index');
})

app.use(memberRoutes);

