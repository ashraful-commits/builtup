
const express = require('express')
const { admindashbord } = require('../controllers/adminController.js')
const { pageRedirect } = require('../middlewares/pageRedirect.js')


//init route
const router = express.Router()

router.get('/', pageRedirect, admindashbord)


// for admin

// export
module.exports = router