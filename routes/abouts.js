const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }));

const aboutCntrl = require('../Controllers/abouts')


router.get('/about/index', aboutCntrl.about_index_get);
module.exports = router