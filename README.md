# Message app (Node.js + Express.js + Passport.js)

A fully functional example project written in JavaScript, showing how to create CRUD application

## Description

In this project I am using Express.js to create Message app. Messages are visible to everyone who visits page, but only users who are logged in can create them. Users also have 1-time opportunity to enter passcode to become member of secret club. Users who are logged in can see messages, but only members of secret club can see who wrote a message and date of creation. I also created admin role, who only can delete messages.

## How to install

1. Clone this repository.

2. Use the package manager [npm](https://www.npmjs.com/) to install dependencies

```bash
npm install
```

3. Create your .env file with next variables:

```bash
DB_STRING='your mongodb url/name_of_database'
SECRET='session secret'
MEMBERSHIP_CODE='code for giving users membership role'
```

4. Connect to your's MongoDB server

5. Start the server and go to 'localhost:3000'

```bash
nodemon app.js
```

## Short Walkthrough

1. User and Message model setup(User can create many messages, but message can have only one creator):

### messages.js

```js
import mongoose from 'mongoose';

const schema = mongoose.Schema;

const messageSchema = new schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema);
```

### users.js

```js
import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    membership: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    tryToBeMember:{
        type: Boolean,
        required: true
    }
})

export const User = mongoose.model('User', userSchema);
```

2. Using 'crypto' library, I am crypting passwords with SHA (Secure Hash Algorithms), to be precise I am using SHA-2 set of algorithms(SHA-512). Passwords are crypted and decrypted with these two functions, which passport is using behind the scenes:

```js
import crypto from 'crypto';

export function validPassword(password, hash, salt){
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

export function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { 
        hash: genHash,
        salt: salt
    }
}
```

3. I also used 'express-session' along with 'passport' library to create sessions and store them in database:

```js
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
```



