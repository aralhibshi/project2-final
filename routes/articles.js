const express= require('express');
const router= express.Router();

router.use(express.urlencoded({ extended: true }));

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

// // Require isLoggedIn
const isLoggedIn = require("../helper/isLoggedIn");

// Controller
const articleCntrl = require("../Controllers/articles");
// Routes
//add route
router.get('/article/add' , isLoggedIn, articleCntrl.article_create_get)
router.post('/article/add' , isLoggedIn,  articleCntrl.article_create_post)
//index route
router.get('/article/index', isLoggedIn, articleCntrl.article_index_get);
//details route
router.get('/article/details' , isLoggedIn, articleCntrl.article_details_get)
// router.get('/myarticles/index' , articleCntrl.article_myarticles_get)
module.exports = router;