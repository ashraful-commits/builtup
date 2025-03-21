const { userdashbord } = require("../controllers/userController.js")
const express = require('express')
const { pageRedirect } = require("../middlewares/pageRedirect.js")


//init route
const router = express.Router()

router.get('/',pageRedirect, userdashbord)


// for admin

// export
module.exports = router