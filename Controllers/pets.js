const Article = require("../Models/Article");
const Pet = require("../Models/Pet");
const User = require("../Models/User");

// Require Moment
const moment = require('moment');

exports.pet_create_get = (req, res) =>{
    res.render("pet/add");
}

exports.pet_create_post = (req, res) => {
    console.log(req.body);
    let pet = new Pet(req.body);

    // Save Pet
    pet.save()
    .then((pet)=>{
        User.findById(req.user._id)
        .then((user) =>{
            user.pet.push(pet._id);
            user.save();
        res.redirect("/mypets/index");

        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later");
    });
}

// HTTP GET - Pets Index
exports.pet_index_get = (req, res) => {
    Pet.find()
    .then(pets => {
        res.render("pet/index", {pets, moment}) ///needs moment {pets, moment}
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Pets by ID
exports.pet_show_get = (req, res) => {
    // res.send("We must finish controllers/articles first {I think but not sure},This message from Controllers/pets line 40")
    console.log(req.query.id);
    Pet.findById(req.query.id) //.populate('article')
    .then(pet => {
        res.render("pet/details", {pet, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load Pets Edit Form
exports.pet_edit_get = (req, res) => {
    Pet.findById(req.query.id)
    .then(pet => {
        res.render("pet/edit", {pet});
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Pets Update
exports.pet_update_put = (req, res) => {
    console.log(req.body.id);
    Pet.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/pet/index");
    })
    .catch(err => {
        console.log(err)
    });
}

  // HTTP DELETE -  Pets
  exports.pet_delete_get = (req, res) => {
    console.log("req", req.query.id);
    Pet.findByIdAndDelete(req.query.id)
    .then(()=> {
        // console.log(req.body.petId);
        // console.log(req.params.id);
        const petId = req.query.id;
        const userId = req.user._id;
        User.findByIdAndUpdate(userId,
            { $pull: { pet: petId } },
            { new: true })
            .then(()=> {
                res.redirect("/mypets/index");
            })
    })
    .catch(err => {
        console.log(err);
    })
};

// HTTP GET - My Pets (Display Current User Pets)
exports.pet_mypets_get = (req, res) => {
    // console.log(req.user._id)
    User.findById(req.user._id).populate('pet')
    .then(user => {
        console.log(user)
        res.render("pet/mypets", {pets: user.pet})
    })
    .catch(err => {
        console.log(err);
    })
}