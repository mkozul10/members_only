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