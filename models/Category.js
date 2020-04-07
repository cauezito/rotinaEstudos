const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

mongoose.model("categories" , Category)