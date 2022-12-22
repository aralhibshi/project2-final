// Require Model
const Article = require("../Models/Article");
const Pet = require("../Models/Pet");
// const User = require('../Models/User')
// Require Moment
const moment = require('moment')
// HTTP GET - Article Index
exports.article_index_get= (req,res)=> {
    //res.render("article/index")
    Article.find().populate('pet')
    .then(articles => {
        res.render('article/index' ,{articles , moment})
    })
    .catch((err) => console.log(err))
}
exports.article_create_get = (req, res) =>{
    // res.render("article/add");
    Pet.find().populate('article')
    .then((pets) => {
        res.render("article/add", { pets })
    })
    .catch(err => {
        console.log(err)
    });
}
exports.article_create_post = (req, res) => {
    console.log(req.body);
    let article = new Article(req.body);
    // Save article
    article.save()
    .then((article)=>{
        // res.redirect("/article/index");
        // Reference Schema
        req.body.pet.forEach(pet => {
            Pet.findById(pet, (err, pet) => {
                article.pet.push(pet);
            })
        });
        res.redirect("/article/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later");
    });
    // Embedded Schema
    // Pet.findById(req.body.pet, (err, pet) => {
    //     pet.article.push(articles);
    //     pet.save();
    //     res.redirect("/pet/index");
    // })
}
// HTTP GET - My Pets (Display Current User Pets)
// exports.article_myarticles_get = (req, res) => {
//     // console.log(req.user._id)
//     User.findById(req.user._id).populate('article')
//     .then(user => {
//         console.log(user)
//         res.render("article/myarticles", {articles: user.article})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }
exports.article_details_get = (req, res) => {
  console.log(req.query.id)
  Article.findById(req.query.id).populate('pet')
  .then(article => {
    res.render('article/details' , {article,moment})
  })
  .catch((err) => {
    console.log(err)
  })
}