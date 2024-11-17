const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("Access denied.");

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info for further use
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

/* const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
 */
