const fs = require("fs");

const readFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const saveToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

module.exports = { readFromFile, saveToFile };
