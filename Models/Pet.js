const mongoose = require('mongoose');

// Pet Schema
const petSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name must be 3 characters or more"],
        maxlength: [20, "Name cannot be more than 20 characters"],
        required: true
    },
    animal: {
        type: String,
        minlength: [3, "Name must be 3 characters or more"],
        maxlength: [20, "Name cannot be more than 20 characters"],
        required: true
    },
    breed: {
        type: String,
        minlength: [3, "Breed must be 3 character or more"],
        maxlength: [20, "Breed cannot be more than 20 characters"],
        required: true,
    },
    age: {
        type: Number,
        minlength: [1, "Age must have 1 digit"],
        maxlength: [2, "Age cannot be more than 2 digits"],
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        minlength: [5, "From must be 5 characters or more"],
        maxlength: [20, "From cannot be more than 20 characters"],
        required: true
    }
   
},
{timestamps: true}) // createdAt and updatedAt

// Pet Model
const Pet = mongoose.model("Pet", petSchema);

// Export model to share it with controller
module.exports = Pet;