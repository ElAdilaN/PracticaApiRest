/* // controllers/bookController.js
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const booksFilePath = "./data/books.json";

// Helper function to load books from the file
const loadBooks = () => {
  if (!fs.existsSync(booksFilePath))
    return {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      books: [],
    };
  const data = JSON.parse(fs.readFileSync(booksFilePath, "utf8"));
  return {
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    books: Array.isArray(data.books) ? data.books : [],
  };
};

// Helper function to save the entire book data structure
const saveBooks = (data) => {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
    console.log("Books data successfully saved.");
  } catch (error) {
    console.error("Error saving books data:", error);
    throw new Error("Failed to save books data");
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, publishedYear, genres, summary } = req.body;

  // Check if all required fields are provided
  if (!title || !author || !publishedYear || !genres || !summary)
    return res.status(400).json({ error: "All fields are required" });

  const data = loadBooks();

  // Create a new book object
  const newBook = {
    id: uuidv4(), // Generate a unique ID for the new book
    details: {
      title,
      author,
      publishedYear,
      genres,
      summary,
    },
  };

  data.books.push(newBook); // Add the new book to the books array
  saveBooks(data); // Save the updated data structure

  res.status(201).json({ message: "Book added successfully", newBook });
};

// Get all books
exports.getBooks = async (req, res) => {
  const data = loadBooks();
  res.status(200).json(data.books); // Return only the books array
};

exports.getBooksById = async (req, res) => {
  const { id } = req.params;

  // Find the book with the matching id
  const booksData = loadBooks();

  // Find the book with the matching id
  const book = booksData.books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

exports.DeleteBookById = async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete book with ID:", id);

  try {
    // Load books data
    const booksData = loadBooks();
    if (!booksData || !Array.isArray(booksData.books)) {
      console.error("Failed to load books data");
      return res.status(500).json({ error: "Failed to load books data" });
    }

    // Find the book index by ID
    const bookIndex = booksData.books.findIndex((b) => b.id == id);
    console.log("Book Index:", bookIndex);

    if (bookIndex === -1) {
      console.error("Book not found for ID:", id);
      return res.status(404).json({ error: "Book not found" });
    }

    // Remove the book from the array
    booksData.books.splice(bookIndex, 1);

    // Save the updated data back to the file
    saveBooks(booksData);
    console.log("Book deleted successfully and data updated.");

    // Return a success message
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
};

exports.UpdateBookById = async (req, res) => {
  const { id } = req.params;

  const { title, author, publishedYear, genres, summary } = req.body;

  // Find the book with the matching id
  const booksData = loadBooks();

  // Find the book with the matching id
  const bookIndex = booksData.books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const updatedBook = {
    ...booksData.books[bookIndex],
    details: {
      title,
      author,
      publishedYear,
      genres,
      summary,
    },
  };

  // Replace the old book with the updated one
  booksData.books[bookIndex] = updatedBook;

  // Update the modified date
  booksData.updatedAt = new Date().toISOString();

  saveBooks(booksData); // Save the updated data structure

  res.status(200).json(updatedBook);
};
 */

const { v4: uuidv4 } = require("uuid");
const { readFromFile, saveToFile } = require("../utils/fileUtils"); // Update the path as needed
const booksFilePath = "./data/books.json";

// Helper function to load books from the file
const loadBooks = () => {
  const data = readFromFile(booksFilePath);
  if (!data || typeof data !== "object") {
    return {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      books: [],
    };
  }
  return {
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    books: Array.isArray(data.books) ? data.books : [],
  };
};

// Helper function to save the entire book data structure
const saveBooks = (data) => {
  data.updatedAt = new Date().toISOString();
  saveToFile(booksFilePath, data);
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, publishedYear, genres, summary } = req.body;

  // Check if all required fields are provided
  if (!title || !author || !publishedYear || !genres || !summary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = loadBooks();

  // Create a new book object
  const newBook = {
    id: uuidv4(), // Generate a unique ID for the new book
    details: {
      title,
      author,
      publishedYear,
      genres,
      summary,
    },
  };

  data.books.push(newBook); // Add the new book to the books array
  saveBooks(data); // Save the updated data structure

  res.status(201).json({ message: "Book added successfully", newBook });
};

// Get all books
exports.getBooks = async (req, res) => {
  const data = loadBooks();
  res.status(200).json(data.books); // Return only the books array
};

// Get book by ID
exports.getBooksById = async (req, res) => {
  const { id } = req.params;

  const booksData = loadBooks();
  const book = booksData.books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

// Delete book by ID
exports.DeleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const booksData = loadBooks();
    const bookIndex = booksData.books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    booksData.books.splice(bookIndex, 1);
    saveBooks(booksData);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
};

// Update book by ID
exports.UpdateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedYear, genres, summary } = req.body;

  const booksData = loadBooks();
  const bookIndex = booksData.books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const updatedBook = {
    ...booksData.books[bookIndex],
    details: {
      title,
      author,
      publishedYear,
      genres,
      summary,
    },
  };

  booksData.books[bookIndex] = updatedBook;
  saveBooks(booksData);

  res.status(200).json(updatedBook);
};
