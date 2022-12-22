// Require Mongoose
const mongoose = require('mongoose');
//Schema
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        minlenght: [2, "Title must have 2 characters or more"],
        maxlength: [100, "Title cannot be more than 10 characters"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    pet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    }]
    // ,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Author",
    //     required: true
    // }
},
// Article Created at and Updated at
{timestamps: true })
// Model
const Article= mongoose.model("Article",articleSchema);
// To Export the model to be shared with the controller
module.exports = Article;