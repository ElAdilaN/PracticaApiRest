// routes/book.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authenticate = require("../middleware/authMiddleware"); // Import your auth middlewaredelter.ca

router.post("/createBook", authenticate, bookController.createBook);
router.get("/getBooks", authenticate, bookController.getBooks);
router.get("/getBooks/:id", authenticate, bookController.getBooksById);
router.delete("/deleteBooks/:id", authenticate, bookController.DeleteBookById);
router.put("/UpdateBook/:id", authenticate, bookController.UpdateBookById);
module.exports = router;
