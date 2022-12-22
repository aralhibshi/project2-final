const express = require('express');

const router = express.Router();


router.use(express.urlencoded({ extended: true }));

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

// // Require isLoggedIn
const isLoggedIn = require("../helper/isLoggedIn");

// Controller
const petCntrl = require("../Controllers/pets");

// Routes for the pet
router.get("/pet/add", isLoggedIn, petCntrl.pet_create_get);
router.post("/pet/add", isLoggedIn, petCntrl.pet_create_post);

router.get("/pet/index", petCntrl.pet_index_get);

router.get("/pet/details", isLoggedIn, petCntrl.pet_show_get);

router.get("/pet/edit", isLoggedIn, petCntrl.pet_edit_get);
router.put("/pet/update", isLoggedIn, petCntrl.pet_update_put);

router.get("/pet/delete", isLoggedIn, petCntrl.pet_delete_get);

router.get("/mypets/index", isLoggedIn, petCntrl.pet_mypets_get);

module.exports = router;