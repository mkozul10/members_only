import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import {connectDB, db} from './config/database.js';

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



