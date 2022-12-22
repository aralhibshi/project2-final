// Requrie User Model
const User = require("../Models/User");

// HTTP GET - Display User Index
exports.user_index_get = (req, res) => {
    User.find()
    .then(user => {
        res.render("user/index", {user})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load User Edit Form
exports.user_edit_get = (req, res) => {
    User.findById(req.query.id)
    .then(user => {
        res.render("user/edit", {user});
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - User Update
exports.user_update_put = (req, res) => {
    console.log(req.body.id);
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/user/index");
    })
    .catch(err => {
        console.log(err)
    });
}