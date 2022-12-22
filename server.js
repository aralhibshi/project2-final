// require dependencies
const express = require('express')
const mongoose = require('mongoose')

//init dotenv
require('dotenv').config()
const port = process.env.PORT;


//init express
const app = express()

// importing express ejs layouts
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

// Express Session and Passport
let passport = require('./helper/ppConfig');
let session = require('express-session');


// Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 36000000}
}));

app.use(passport.initialize());
app.use(passport.session());


///Sharing the infomation with all web pages
app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    next()
    
})


mongoose.set('strictQuery' , false)
mongoose.set('strictPopulate' , false)

app.use(express.urlencoded({extended: true}));

app.set('view engine' , 'ejs')

//requiring the routes
const indexRoute = require('./routes/index')
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const articlesRoute = require('./routes/articles');
const petRoute = require('./routes/pets');
const aboutRoute = require('./routes/abouts');

//mounting the mounts
app.use('/', indexRoute)
app.use('/', userRoute)
app.use('/', authRoute)
app.use('/', articlesRoute);
app.use('/', petRoute)
app.use('/', aboutRoute);

// Look for static files in public folder
app.use(express.static("public"));

//server working on port 4005
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})

// connect to the DB
mongoose.connect(process.env.mongoDBURL,
    {useNewURLParser: true, useUnifiedTopology: true},
    () => {
        console.log("MongoDB Connected Successfully")
    }
)