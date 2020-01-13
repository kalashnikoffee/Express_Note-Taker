const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const dbPath = path.join(__dirname, "db", "db.json");
const app = express();
const PORT = process.env.PORT || 3000;