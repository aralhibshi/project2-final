const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

// User Schema with Referenced Pet and Article Models
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minlength: [3, "First Name must be 3 characters or more"],
        maxlength: [20, "First Name cannot be more than 20 characters"],
        required: true,
    },
    lastName : {
        type: String,
        minlength: [3, "Last Name must be 3 characters or more"],
        maxlength: [20, "Last Name cannot be more than 20 characters"],
        required: true,
    },
    emailAddress: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: [8, "Password must be 8 characters or more"],
        required: true,
    },
    country: {
        type: String,
        required: false,
    },
    pet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
]
},

// Created At and Updated At
{timestamps: true});

// Verify Password
userSchema.methods.verifyPassword = function (password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User' , userSchema)

module.exports = User