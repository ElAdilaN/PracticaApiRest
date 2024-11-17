const express = require("express");
const bookstoresController = require("../controllers/bookStoresController");
const salesController = require("../controllers/salesController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all bookstores
router.get("/", authMiddleware, bookstoresController.getAllBookstores);

// Get bookstore by ID
router.get("/:id", authMiddleware, bookstoresController.getBookstoreById);

// Create a new bookstore
router.post("/", authMiddleware, bookstoresController.createBookstore);

// Update bookstore
router.put("/:id", authMiddleware, bookstoresController.updateBookstore);

// Delete bookstore
router.delete("/:id", authMiddleware, bookstoresController.deleteBookstore);

// Get bookstore revenue
// Route for getting the revenue of a bookstore
/*router.get(
  "/bookstore/revenue/:bookstoreId",
  authMiddleware,
  bookstoresController.getRevenue
);

/* // Route for updating the inventory of a bookstore
router.put(
  "/bookstores/:id/inventory/update",
  authMiddleware,
  bookstoresController.updateInventory
);
 */
module.exports = router;
