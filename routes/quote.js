const express = require("express");
const multer = require("multer");
const {
  renderQuoteForm,
  createQuoteRequest,
  getAllQuotes,
  getQuoteById,
  updateQuoteApproved,
  updateQuoteReject,
  deleteQuoteRequest,
} = require("../controllers/quoteController");
const { pdfMulter } = require("../middlewares/multer");
const { pageRedirect } = require("../middlewares/pageRedirect");
const { processPayment } = require("../controllers/paymentController");

const router = express.Router();
router.use(pageRedirect);
// Routes
router.get("/", renderQuoteForm);
router.post("/", pdfMulter, createQuoteRequest);
router.get("/", getAllQuotes);
router.get("/:id", getQuoteById);
router.get("/update-approve/:id",pdfMulter,  updateQuoteApproved);
router.get("/update-reject/:id",pdfMulter,  updateQuoteReject);
router.get("/delete-quote/:id", deleteQuoteRequest);
router.post('/payment/:quoteId', processPayment);

module.exports = router;
