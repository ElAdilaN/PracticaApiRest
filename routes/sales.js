const express = require("express");
const salesController = require("../controllers/salesController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get total revenue for a specific bookstore
router.get(
  "/bookstore/revenue/:bookstoreId",
  authMiddleware,
  salesController.getBookstoreRevenue
);

// Get number of copies sold for a specific book
router.get(
  "/book/copies/:bookId",
  authMiddleware,
  salesController.getCopiesSold
);

module.exports = router;
