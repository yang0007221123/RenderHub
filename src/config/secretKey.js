const path = require("path");
const fs = require("fs");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./secretKeys/private.key"), "utf8");
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./secretKeys/public.key"), "utf8");

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}