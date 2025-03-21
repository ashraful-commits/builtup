const express = require("express");
const { homePage, aboutPage, servicePage, additionPage, basementPage, renovancePage, rooflingPage, sidingPage, blogPage, contactPage, blogopenPage ,chagngePassword,resetPassword,
    forgetPassword} = require("../controllers/publicController");
const { pageRedirect } = require("../middlewares/pageRedirect");
const { paymentSuccess } = require("../controllers/paymentController");

// init route
const router = express.Router(); 

router.get('/', homePage);
router.get('/about', aboutPage);
router.get('/service', servicePage);
router.get('/blog', blogPage);
router.get('/blogopen/:id', blogopenPage);
router.get('/contact', contactPage);
router.get('/addition-service', additionPage);
router.get('/basement', basementPage);
router.get('/renovation', renovancePage);
router.get('/roofing', rooflingPage);
router.get('/siding', sidingPage); 
router.get('/change-password', pageRedirect, chagngePassword); 
router.get('/forget-password', forgetPassword); 
router.get('/resetpass/:token', resetPassword); 
router.get('/payment/success', paymentSuccess); 


module.exports = router; 
