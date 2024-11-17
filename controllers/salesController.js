const fs = require("fs");
const path = require("path");
const salesFilePath = path.join(__dirname, "..", "data", "sales.json");
const bookstoresFilePath = path.join(
  __dirname,
  "..",
  "data",
  "bookstores.json"
);

// Load sales and bookstores data
const loadSales = () =>
  JSON.parse(fs.readFileSync(salesFilePath, "utf-8")).sales;
const loadBookstores = () =>
  JSON.parse(fs.readFileSync(bookstoresFilePath, "utf-8")).bookstores;

// Get total revenue for a bookstore
exports.getBookstoreRevenue = (req, res) => {
  const bookstoreId = req.params.bookstoreId;

  const sales = loadSales().filter((sale) => sale.bookstoreId === bookstoreId);
  if (sales.length === 0) {
    return res
      .status(404)
      .json({ message: "No sales found for this bookstore." });
  }

  const revenue = sales.reduce((total, sale) => {
    // Calculate the revenue after discount
    const discountedPrice =
      sale.totalPrice - sale.totalPrice * (sale.discountPercentage / 100);
    return total + discountedPrice;
  }, 0);

  res.json({ bookstoreId, revenue });
};

// Get total number of copies sold for a specific book
exports.getCopiesSold = (req, res) => {
  const bookId = req.params.bookId;

  const sales = loadSales();

  const copiesSold = sales.reduce((total, sale) => {
    // Find the specific book in the sale
    const bookSale = sale.books.find((book) => book.bookId === bookId);
    if (bookSale) {
      return total + bookSale.quantity; // Add quantity sold
    }
    return total;
  }, 0);

  if (copiesSold === 0) {
    return res.status(404).json({ message: "No sales found for this book." });
  }

  res.json({ bookId, copiesSold });
};

// Example: Calculate total revenue for a specific bookstore
// /api/v1/sales/bookstore/revenue/:bookstoreId

// Example: Calculate copies sold for a specific book
// /api/v1/sales/book/copies/:bookId
