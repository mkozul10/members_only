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
    }

}, {timestamps: true})

export const User = mongoose.model('User', userSchema);