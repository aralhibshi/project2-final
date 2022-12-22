// Require Mongoose
const mongoose = require("mongoose");

// Schema
const authorSchema = mongoose.Schema({
    // name: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true
    }
})

// Model
const Author = mongoose.model("Author", authorSchema);

module.exports = Author;