// server.js
require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const bookstoreRoutes = require("./routes/bookstores");
const salesRoutes = require("./routes/sales");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const port = process.env.PORT || 3000;

app.use(express.json());

// Use authentication routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/crud", bookRoutes);
app.use("/api/v1/bookstores", bookstoreRoutes);
app.use("/api/v1/sales", salesRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
