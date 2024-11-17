/* const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { readFromFile, saveToFile } = require("../utils/fileUtils"); // Adjust path as necessary

const usersFilePath = "./data/users.json"; // Ensure this path matches your project structure

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const users = readFromFile(usersFilePath);
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuid.v4(), username, password: hashedPassword };

  users.push(user);
  saveToFile(usersFilePath, users);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ message: "User registered successfully", token });
};

// Log in an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const users = readFromFile(usersFilePath);
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Logged in successfully", token });
}; */

// controllers/authController.js
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const usersFilePath = "./data/users.json";
const { saveToFile, readFromFile } = require("../utils/fileUtils");

// Helper function to load users from the file
const loadUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  return JSON.parse(fs.readFileSync(usersFilePath, "utf8") || "[]");
};

// Helper function to save users to the file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
};

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const users = loadUsers();
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuid.v4(), username, password: hashedPassword };

  users.push(user);
  saveUsers(users);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ message: "User registered successfully", token });
};

// Log in an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Logged in successfully", token });
};
