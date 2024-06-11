const path = require("path");
const fs = require("fs");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./secretKeys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./secretKeys/public.key"));

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}