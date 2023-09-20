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
    },
    messages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Message'
        }
    ]
})

export const User = mongoose.model('User', userSchema);