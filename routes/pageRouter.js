const express = require("express");
const {
  userSignUp,
  loginUser,
  activeUser,
  passwordChange,
  forgetPage,
  passResetMail,
  resetPage,
  resetpassword,
  userLogout,
  passwordPage,
  signupPage,
  loginPage,homePage
} = require("../controllers/pageController");

const { loginCheck } = require("../middlewares/loginCheck");
const { pageRedirect } = require("../middlewares/pageRedirect");

// Create Router
const router = express.Router();

// Home page route (if needed for this router)
router.route("/").get( homePage);

// Password Routes
router.route("/change-password").get(pageRedirect, passwordPage).post(passwordChange);

// Authentication Routes
router.route("/register").get(loginCheck, signupPage).post(userSignUp);
router.route("/login").get(loginCheck, loginPage).post(loginUser);
router.route("/active/:token").get(activeUser);
router.route("/logout").get(userLogout);

// Forget/Reset Password Routes
router.route("/forget-password").get(forgetPage).post(passResetMail);
router.route("/reset-password/:token").get(resetPage).post(resetpassword);

module.exports = router;
