const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

// // Require isLoggedIn
const isLoggedIn = require("../helper/isLoggedIn");

// Controller
const userCtrl = require("../Controllers/user");

router.get("/user/index", isLoggedIn, userCtrl.user_index_get);

router.get("/user/edit", isLoggedIn, userCtrl.user_edit_get);
router.put("/user/update", isLoggedIn, userCtrl.user_update_put);

// Export Router
module.exports = router