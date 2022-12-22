const express = require('express')
const router = express.Router()

const indexCntrl = require('../Controllers/index')

router.get('/' , indexCntrl.index_get)

module.exports = router