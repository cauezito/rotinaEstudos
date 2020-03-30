const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Study = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    extra: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("study", Study);