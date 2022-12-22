const User = require('../Models/User');
const bcrypt = require("bcrypt");
const salt = 10;
let passport=require('../helper/ppConfig')

// for GETTING the signup page
exports.auth_signup_get = (req,res)=> {
    res.render('auth/signup')
}
    //for POSTING the signup page
exports.auth_signup_post = (req,res) =>{
    
    let user = new User(req.body)
    console.log(req.body)
    let crypt = bcrypt.hashSync(req.body.password, salt);

    user.password = crypt

    user.save()
    .then(()=> {
        res.redirect('/auth/signin')
    })
    .catch((err)=> {
        console.log(err);
        res.send("Wrong Password")
    })
}

exports.auth_signin_get = (req,res) => {
    res.render('auth/signin')
}

// HTTP POST - Signin Route - To post the data
exports.auth_signin_post = passport.authenticate('local',{
    successRedirect:"/article/index",
    failureRedirect: "/auth/signin"
})
/// LOG OUT
exports.auth_logout_get = (req,res) => {
    req.logout(function(err){
        if (err){
            return next(err)
        }
        res.redirect("/")
    })
}