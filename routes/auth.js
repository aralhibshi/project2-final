const express = require('express')
const router = express.Router()

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

const authCntrl = require('../Controllers/auth')

router.get('/auth/signup' , authCntrl.auth_signup_get)
router.post('/auth/signup' , authCntrl.auth_signup_post)


router.get('/auth/signin' , authCntrl.auth_signin_get)
router.post('/auth/signin' , authCntrl.auth_signin_post)

router.get("/auth/logout", authCntrl.auth_logout_get);
module.exports = router