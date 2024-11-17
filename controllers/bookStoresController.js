const { v4: uuidv4 } = require("uuid");
const { readFromFile, saveToFile } = require("../utils/fileUtils");
const bookstoresFilePath = "./data/bookstores.json";
const loadBookstores = () =>
  JSON.parse(fs.readFileSync(bookstoresFilePath, "utf-8")).bookstores;

// Helper function to get the current timestamp
const getTimestamp = () => new Date().toISOString();

// Get all bookstores
exports.getAllBookstores = (req, res) => {
  try {
    const data = readFromFile(bookstoresFilePath);
    res.status(200).json(data.bookstores);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch bookstores." });
  }
};

// Get a single bookstore by ID
exports.getBookstoreById = (req, res) => {
  try {
    const { id } = req.params;
    const data = readFromFile(bookstoresFilePath);
    const bookstore = data.bookstores.find((b) => b.id === id);

    if (!bookstore) {
      return res.status(404).json({ error: "Bookstore not found." });
    }

    res.status(200).json(bookstore);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch bookstore." });
  }
};

// Create a new bookstore
exports.createBookstore = (req, res) => {
  try {
    const { name, location, contact } = req.body;

    // Validate input
    if (!name || !location || !contact?.phone || !contact?.email) {
      return res.status(400).json({ error: "Invalid bookstore data." });
    }

    const data = readFromFile(bookstoresFilePath);
    const newBookstore = {
      id: uuidv4(), // Generate a unique ID for the bookstore
      name,
      location,
      contact,
      inventory: [],
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    };

    data.bookstores.push(newBookstore);
    saveToFile(bookstoresFilePath, data);

    res
      .status(201)
      .json({ message: "Bookstore created successfully.", newBookstore });
  } catch (error) {
    res.status(500).json({ error: "Failed to create bookstore." });
  }
};

// Update bookstore details
exports.updateBookstore = (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, contact } = req.body;

    // Validate input
    if (!name || !location || !contact?.phone || !contact?.email) {
      return res.status(400).json({ error: "Invalid bookstore data." });
    }

    const data = readFromFile(bookstoresFilePath);
    const bookstoreIndex = data.bookstores.findIndex((b) => b.id === id);

    if (bookstoreIndex === -1) {
      return res.status(404).json({ error: "Bookstore not found." });
    }

    // Update the bookstore data
    data.bookstores[bookstoreIndex] = {
      ...data.bookstores[bookstoreIndex],
      name,
      location,
      contact,
      updatedAt: getTimestamp(),
    };

    saveToFile(bookstoresFilePath, data);

    res.status(200).json({
      message: "Bookstore updated successfully.",
      updatedBookstore: data.bookstores[bookstoreIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update bookstore." });
  }
};

// Delete a bookstore
exports.deleteBookstore = (req, res) => {
  try {
    const { id } = req.params;

    const data = readFromFile(bookstoresFilePath);
    const bookstoreIndex = data.bookstores.findIndex((b) => b.id === id);

    if (bookstoreIndex === -1) {
      return res.status(404).json({ error: "Bookstore not found." });
    }

    data.bookstores.splice(bookstoreIndex, 1); // Remove bookstore from the list
    saveToFile(bookstoresFilePath, data);

    res.status(200).json({ message: "Bookstore deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bookstore." });
  }
};

const salesData = require("../data/sales.json");
const bookstoresData = require("../data/bookstores.json");

/*exports.getRevenue = (req, res) => {
  const bookstoreId = req.params.bookstoreId;

  // Filter sales for the specific bookstoreId
  const bookstoreSales = salesData.sales.filter(
    (sale) => sale.bookstoreId === bookstoreId
  );

  // Calculate total revenue
  let totalRevenue = 0;
  bookstoreSales.forEach((sale) => {
    totalRevenue += sale.totalPrice;
  });

  // If no sales data found for the bookstore
  if (totalRevenue === 0) {
    return res
      .status(404)
      .json({ error: "No sales data found for this bookstore." });
  }

  // Return the revenue data
  res.status(200).json({
    bookstoreId: bookstoreId,
    revenue: totalRevenue,
  });
};

module.exports = { getRevenue };

/*
// Update bookstore inventory after a sale
exports.updateBookstoreInventory = (req, res) => {
  const bookstoreId = req.params.id;
  const { saleId, books } = req.body; // Assume books is an array with bookId and quantity

  const bookstores = loadBookstores();
  const bookstore = bookstores.find((b) => b.id === bookstoreId);
  if (!bookstore) {
    return res.status(404).json({ message: "Bookstore not found" });
  }

  books.forEach((book) => {
    const inventoryItem = bookstore.inventory.find(
      (i) => i.bookId === book.bookId
    );
    if (inventoryItem) {
      inventoryItem.quantity -= book.quantity; // Reduce stock by the quantity sold
    }
  });

  fs.writeFileSync(bookstoresFilePath, JSON.stringify({ bookstores }, null, 2));
  res.json({ message: "Inventory updated" });
};

// bookstoreController.js

const salesData = require("../data/sales.json"); // Assuming sales data is stored in sales.json
const { sales } = salesData; // Extract sales array from sales.json
*/
// Function to calculate the total revenue of a specific bookstore
/*exports.getRevenue = (req, res) => {
  const { bookstoreId } = req.params;

  // Filter sales by bookstoreId
  const bookstoreSales = sales.filter(
    (sale) => sale.bookstoreId === bookstoreId
  );

  // If no sales found for the bookstore
  if (bookstoreSales.length === 0) {
    return res.status(404).json({
      message: "No sales found for this bookstore.",
    });
  }

  // Calculate the total revenue, considering the discount on each sale
  let totalRevenue = 0;
  bookstoreSales.forEach((sale) => {
    const discountedPrice =
      sale.totalPrice - sale.totalPrice * (sale.discountPercentage / 100);
    totalRevenue += discountedPrice;
  });

  // Return the total revenue of the bookstore
  return res.json({
    bookstoreId,
    revenue: totalRevenue.toFixed(2), // Format the revenue to 2 decimal places
  });
};

module.exports = { getRevenue };
*/
