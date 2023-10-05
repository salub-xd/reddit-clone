const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    likes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
        ],
        default: [],
    },
}, { timestamps: true });

const model = mongoose.model('Post', postSchema);
module.exports = model;