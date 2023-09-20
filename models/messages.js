import mongoose from 'mongoose';

const schema = mongoose.Schema;

const messageSchema = new schema({
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema);