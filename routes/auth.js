
const express = require("express")
const { registerPage, createRegisteForm, loginPage, createLoginForm, userdashbordRoute } = require("../controllers/authController.js")
const { pageRedirect } = require("../middlewares/pageRedirect.js")


//init route
const router = express.Router()

// for resister
router.get('/register', pageRedirect, registerPage)
router.post('/register',pageRedirect, createRegisteForm)

// for login
router.get('/login',pageRedirect, loginPage)
router.post('/login', pageRedirect, createLoginForm)


// for admin

// export
module.exports = router